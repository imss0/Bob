import { Shift, Shifts } from "../../types";
import * as ApiService from "../../ApiService";

function Cell({
  shift,
  shifts,
  setShifts,
  className,
  cellDayNumber,
  shiftType,
  userId,
}: {
  shift: number;
  shifts: Shifts[];
  cellDayNumber: number;
  setShifts: React.Dispatch<React.SetStateAction<Shifts[]>>;
  className: string;
  shiftType: any;
  userId: string;
}) {
  const handleUpdate = (index: number, value: string) => {
    const updatedShifts: Shifts[] = shifts.map((item: any) => {
      if (item.shift_type_id === shiftType.shift_type_id) {
        const currentShiftDaysArray = String(item.day_number_array)
          .substring(1, item.day_number_array.length - 1)
          .split(",");
        currentShiftDaysArray.splice(index, 1, value);
        return {
          shift_type_id: item.shift_type_id,
          shift_id: item.shift_id,
          day_number_array: `[${currentShiftDaysArray}]`,
        };
      } else {
        return item;
      }
    });
    setShifts([...updatedShifts]);
  };

  const handleSave = (id: number, value: string) => {
    const currentShiftDays = shifts.find(
      (item) => item.shift_type_id === shiftType.shift_type_id
    )?.day_number_array;
    if (currentShiftDays) {
      const tempArr = String(currentShiftDays)
        .substring(1, currentShiftDays.length - 1)
        .split(",");

      tempArr.splice(id, 1, value === "" ? "0" : value);
      ApiService.changeShift(
        shiftType.shift_type_id,
        tempArr.map((item) => Number(item)),
        userId
      );
    }
  };

  return (
    <>
      <input
        type="text"
        defaultValue={shift}
        className={`grid-element ${className}`}
        name="people_required"
        onChange={(ev) => handleUpdate(cellDayNumber, ev.target.value)}
        onBlur={(ev) => handleSave(cellDayNumber, ev.target.value)}
      />
    </>
  );
}

export default Cell;
