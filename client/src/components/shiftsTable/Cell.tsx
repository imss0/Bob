import { Shift, Shifts } from "../../types";
import * as ApiService from "../../ApiService";

function Cell({
  shift,
  shifts,
  setShifts,
  className,
  cellDayNumber,
  shiftType,
}: {
  shift: number;
  shifts: Shifts[];
  cellDayNumber: number;
  setShifts: React.Dispatch<React.SetStateAction<Shifts[]>>;
  className: string;
  shiftType: any;
}) {
  console.log("SHISTSTS", shifts);

  const handleUpdate = (index: number, value: string) => {
    // let updatedShifts = [...shifts].map((shift) =>
    //   shift.shift_id === String(id) ? { ...shift, [field]: value } : shift
    // );
    const updatedShifts = shifts.map((item: any) => {
      if (item.shift_type_id === shiftType.shift_type_id) {
        const currentShiftDaysArray = item.day_number_array[index]
          .substring(1, item.day_number_array.length - 1)
          .split(",");
        return {
          ...item,
          days_number_array: currentShiftDaysArray.splice(
            index,
            1,
            value === "" ? 0 : value
          ),
        };
      } else {
        return shift;
      }
    });
    setShifts(updatedShifts);
  };

  const handleSave = (id: number, value: string) => {
    console.log("ARR", { shifts }, { id }, { value }, { shiftType });
    const currentShiftDays = shifts.find(
      (item) => item.shift_type_id === shiftType.shift_type_id
    )?.day_number_array;
    if (currentShiftDays) {
      const tempArr = String(currentShiftDays)
        .substring(1, currentShiftDays.length - 1)
        .split(",");

      tempArr.splice(id, 1, value === "" ? "0" : value);
      console.log("UPDATED", tempArr);
      ApiService.changeShift(
        shiftType.shift_type_id,
        tempArr.map((item) => Number(item))
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
