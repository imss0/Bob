import { Shifts } from "../../types";
import * as ApiService from "../../ApiService";

function Cell({
  shift,
  shifts,
  setShifts,
  // def,
  className,
  id,
}: {
  shift: number;
  shifts: Shifts[];
  id: number;
  setShifts: React.Dispatch<React.SetStateAction<Shifts[]>>;
  // def: string | number | readonly string[] | undefined;
  className: string;
}) {
  console.log("SHISTSTS", shifts);

  const handleUpdate = (id: number, field: string, value: string) => {
    let updatedShifts = [...shifts].map((shift) =>
      shift.shift_id === String(id) ? { ...shift, [field]: value } : shift
    );
    setShifts(updatedShifts);
  };

  const handleSave = (id: number, field: string, value: string) => {
    ApiService.changeShift(id, field, value);
  };

  return (
    <>
      <input
        type="text"
        defaultValue={shift}
        className={`grid-element ${className}`}
        name="people_required"
        onChange={(ev) => handleUpdate(id, "people_required", ev.target.value)}
        onBlur={(ev) => handleSave(id, "people_required", ev.target.value)}
      />
    </>
  );
}

export default Cell;
