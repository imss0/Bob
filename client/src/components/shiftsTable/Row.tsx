import Cell from "./Cell";
import { Shifts, ShiftTypes as ShiftTypesType } from "../../types";

function Row({
  shiftType,
  shifts,
  setShifts,
}: {
  shiftType: ShiftTypesType;
  shifts: Shifts[];
  setShifts: React.Dispatch<React.SetStateAction<Shifts[]>>;
}) {
  console.log({ shifts });
  console.log("shiftTypes", shiftType);

  return (
    <>
      <div className="row-header header">{shiftType.abbreviation}</div>

      {shifts
        .filter((shift) => shift.shift_type_id === shiftType.shift_type_id)
        .map((shift) =>
          String(shift.day_number_array)
            .substring(1, shift.day_number_array.length - 1)
            .split(",")
            .map((shift, i) => (
              <Cell
                className={`grid-element-${
                  (i + 1) % 7 === 0 ? "seventh" : "week"
                }`}
                key={i}
                cellDayNumber={i}
                setShifts={setShifts}
                shifts={shifts}
                shiftType={shiftType}
                shift={Number(shift)}
              />
            ))
        )}
    </>
  );
}

export default Row;
