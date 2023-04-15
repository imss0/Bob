import { useState, useEffect } from "react";
import helper from "../helper";
import { TiDeleteOutline } from "react-icons//ti";
import { MdDownloadDone } from "react-icons/md";
import "./shiftTypes.css";
import { Shifts, ShiftTypes as ShiftTypesType } from "../types";
import * as ApiService from "../ApiService";
import { useUser } from "@clerk/clerk-react";

function ShiftTypes({
  shiftTypes,
  setShiftTypes,
  shifts,
  setShifts,
  userId,
}: {
  shiftTypes: ShiftTypesType[];
  setShiftTypes: React.Dispatch<React.SetStateAction<ShiftTypesType[]>>;
  shifts: Shifts[];
  setShifts: React.Dispatch<React.SetStateAction<(number | Shifts)[]>>;
  userId: string;
}) {
  const [newShiftType, setNewShiftType] = useState({
    description: "",
    abbreviation: "",
    start: "",
    end: "",
  });
  const URL = "http://localhost:4000/";
  const user = useUser();

  useEffect(() => {
    ApiService.getShiftTypes(userId)
      .then((data) => setShiftTypes(data)) // helper.sortShiftTypeByName
      .catch((error) => console.error(error));
  }, [setShiftTypes]);

  const handleDelete = (id: number) => {
    ApiService.deleteShiftType(id, userId)
      .then(() =>
        setShiftTypes(shiftTypes.filter((shift) => shift.shift_type_id !== id))
      )
      .catch((error) => console.error(error));
  };

  async function addShift(day_number_array: number[], shift_type_id: number) {
    return ApiService.addShift(day_number_array, shift_type_id, userId);
  }

  async function handleAdd() {
    // Adding a new shift type:
    const newShiftTypeId = // @TODO - use ApiService (but now it has type issue)
      await fetch(URL + "shift-type/" + userId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newShiftType, user: user?.user?.id }),
      }).then((response) => response.json());
    let tmpShiftType = newShiftTypeId;
    let updatedList = [...shiftTypes, tmpShiftType];
    setShiftTypes(updatedList); // helper.sortShiftTypeByName

    // Creating 28 placeholder shifts associated with the new shift type
    // so that the shift table is pre-populated:
    let newShifts = [...Array(28).fill(0)];
    // newShifts = await Promise.all(
    //   newShifts.map(async (shift) => {
    //     return addShift(shift, tmpShiftType.shift_type_id);
    //   })
    // );
    addShift(newShifts, tmpShiftType.shift_type_id);
    //updating shifts:
    setShifts([...shifts, ...newShifts]);
    setNewShiftType({ description: "", abbreviation: "", start: "", end: "" });
  }

  const handleUpdate = (id: number, field: string, value: string) => {
    let updatedShifts = [...shiftTypes];
    updatedShifts = updatedShifts.map((shift) =>
      shift.shift_type_id === id ? { ...shift, [field]: value } : shift
    );
    setShiftTypes(updatedShifts); // helper.sortShiftTypeByName
  };

  const handleSave = (id: number, field: string, value: string) => {
    ApiService.changeShiftType(id, field, value, userId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewShiftType({
      ...newShiftType,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <table className="shifts-table">
      <thead>
        <tr className="table-head" data-testid="tableHead">
          <th>Type</th>
          <th>Abbreviation</th>
          <th>Start</th>
          <th>End</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {shiftTypes.map((shiftType) => (
          <tr key={shiftType.shift_type_id} data-testid="getAllData">
            <td>
              <input
                type="text"
                defaultValue={shiftType.description}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(
                    shiftType.shift_type_id,
                    "description",
                    ev.target.value
                  )
                }
                onBlur={(ev) =>
                  handleSave(
                    shiftType.shift_type_id,
                    "description",
                    ev.target.value
                  )
                }
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue={shiftType.abbreviation}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(
                    shiftType.shift_type_id,
                    "abbreviation",
                    ev.target.value
                  )
                }
                onBlur={(ev) =>
                  handleSave(
                    shiftType.shift_type_id,
                    "abbreviation",
                    ev.target.value
                  )
                }
              />
            </td>
            <td>
              <input
                type="time"
                defaultValue={shiftType.start}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(
                    shiftType.shift_type_id,
                    "start",
                    ev.target.value
                  )
                }
                onBlur={(ev) =>
                  handleSave(shiftType.shift_type_id, "start", ev.target.value)
                }
              />
            </td>
            <td>
              <input
                type="time"
                defaultValue={shiftType.end}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(shiftType.shift_type_id, "end", ev.target.value)
                }
                onBlur={(ev) =>
                  handleSave(shiftType.shift_type_id, "end", ev.target.value)
                }
              />
            </td>
            <td>
              <button
                className="shift-btn delete-btn"
                data-testid="deleteBtn"
                onClick={() => handleDelete(shiftType.shift_type_id)}
              >
                <TiDeleteOutline />
              </button>
            </td>
          </tr>
        ))}

        <tr className="add-form">
          <td>
            <input
              className="add-input"
              type="text"
              placeholder="shift-type"
              name="description"
              value={newShiftType.description}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              type="text"
              placeholder="abbreviation"
              name="abbreviation"
              value={newShiftType.abbreviation}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              placeholder="start-time"
              type="time"
              name="start"
              value={newShiftType.start}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              placeholder="end-time"
              type="time"
              name="end"
              value={newShiftType.end}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <button
              className="shift-btn add-btn"
              onClick={handleAdd}
              data-testid="addBtn"
            >
              <MdDownloadDone />{" "}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ShiftTypes;
