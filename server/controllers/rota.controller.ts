"use strict";

import { Request, Response } from "express";
import { Employees, ShiftTypes } from "../types";

const { Op } = require("sequelize");
const db = require("../models");
const { shiftDuration, fakeDate } = require("../convertTime");

const MAXHOURS = 150;

async function getAllShiftsWithShiftType(user_id: string) {
  try {
    let shiftsCell = await db.ShiftType.findAll({
      include: [
        {
          model: db.Shift,
          required: true,
          where: {
            shift_type_id: { [Op.not]: null },
          },
        },
      ],
      raw: true,
    });

    const reformatedArray = shiftsCell
      .map((shift: any) => {
        if (shift.user_id !== user_id) return null;
        return String(shift["shifts.day_number_array"])
          .substring(1, shift["shifts.day_number_array"].length - 1)
          .split(",")
          .map((item: any, i: any) => {
            return {
              shift_type_id: shift["shift_type_id"],
              abbreviation: shift["abbreviation"],
              start: shift["start"],
              end: shift["end"],
              description: shift["description"],
              user_id: shift.user_id,
              "shifts.day_number": i + 1,
              "shifts.people_required": item,
            };
          });
      })
      .filter((shift: any) => shift !== null);
    return reformatedArray;
  } catch (error) {
    console.error(error);
  }
}

let getAllEmployees = async (user_id: string) => {
  try {
    let temp = await db.Employee.findAll({
      where: {
        user_id: user_id,
      },
      raw: true,
    });
    let employees = temp.map((emp: Employees) => ({
      employee_id: emp.employee_id,
      name: `${emp.name} ${emp.surname}`,
      shifts: [],
      hours: 0,
    }));
    return employees;
  } catch (error) {
    console.error(error);
  }
};

async function expandShiftsWithShiftType(user_id: string) {
  let days: Record<string, any> = [...Array(31).keys()].reduce((acc, elem) => {
    return { ...acc, ...{ [elem + 1]: [] } };
  }, {});
  try {
    let inp = await getAllShiftsWithShiftType(user_id);
    let out = inp
      .flat()
      .filter((shift: any) => shift["shifts.people_required"] > 0)
      .map((shift: ShiftTypes) => {
        return { ...shift, assignedEmployees: [] };
      });
    out.forEach((shift: any) => {
      let d = shift["shifts.day_number"].toString();
      days[d].push(shift);
    });
    return days;
  } catch (err) {
    console.error(err);
  }
}

function prioritise(employees: Employees[], shiftType: Record<string, any>) {
  let startTime = shiftType.start;
  let startDay = shiftType["shifts.day_number"];
  let comparisonEmployees = employees.map((x: Record<string, any>) => {
    if (x.shifts.at(-1)) {
      let lastShiftEnd = x.shifts.at(-1).end;
      let isNewDayEnd = shiftDuration(
        x.shifts.at(-1).start,
        lastShiftEnd
      ).isNewDayEnd;
      let lastShiftDay =
        x.shifts.at(-1)["shifts.day_number"] + (isNewDayEnd ? 1 : 0);
      let newBegin = fakeDate(startDay, startTime);
      let oldEnd = fakeDate(lastShiftDay, lastShiftEnd);
      var hoursDelta = (newBegin - oldEnd) / 36e5;
      x.restedEnough = hoursDelta >= 11.5;
    } else {
      x.restedEnough = true;
    }
    return x;
  });
  comparisonEmployees = comparisonEmployees
    .filter((x) => x.hours < MAXHOURS)
    .filter((x) => x.restedEnough)
    .map((x) => x.employee_id);
  return comparisonEmployees;
}

// async function generateRandomRotas (numRotas) {
async function generateRandomRotas(user_id: string) {
  let inpDays = await expandShiftsWithShiftType(user_id);
  let inpEmployees = await getAllEmployees(user_id);
  let bestRota: unknown[] = [];
  let numRotas = 1;
  for (let i of Array(numRotas)) {
    let days: Record<string, any> = { ...inpDays };
    let employees = [...inpEmployees];
    // loop for every day
    for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
      // if no shift is required, go to next day
      if (days[dayNumber].length === 0) {
        continue;
      }

      // loop through each array of shifts in a day
      (days[dayNumber] ?? []).forEach((shiftType: any) => {
        let availablePeople = employees
          .filter((x) =>
            prioritise(employees, shiftType).includes(x.employee_id)
          )
          .sort((a, b) => a.hours - b.hours);

        let toBeAssigned: any[] = [];
        if (availablePeople.length < shiftType["shifts.people_required"]) {
          throw new Error(
            "There is an issue with the number of available employees. Check you hired enough"
          );
        }
        toBeAssigned = availablePeople.slice(
          0,
          shiftType["shifts.people_required"]
        );

        // Here goes the logic to update the shifts
        shiftType["assignedEmployees"] = toBeAssigned;

        employees
          .filter((x) =>
            toBeAssigned.map((y) => y.employee_id).includes(x.employee_id)
          )
          .forEach((x) => {
            // Here goes the logic to update the employees
            x.shifts.push(shiftType);
            x.hours =
              x.hours + shiftDuration(shiftType.start, shiftType.end).delta;
          });
      });
    }
    employees.forEach((x) => {
      if (x.shifts.length > 0) {
        // because shifts include employees which include shifts
        x.shifts.forEach(
          (s: Record<string, any>) => delete s.assignedEmployees
        );
      }
    });
    bestRota = employees;
  }
  return bestRota;
}

exports.getRota = async (req: Request, res: Response) => {
  try {
    let rota = await generateRandomRotas(req.params.user_id);
    res.status(200).send(rota);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export {};
