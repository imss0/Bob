import "./shifts.css";
import Row from "./Row";
import { Shifts, ShiftTypes as ShiftTypesType } from "../../types";

function Shift({
  shifts,
  setShifts,
  shiftTypes,
  userId,
}: {
  shifts: Shifts[];
  setShifts: React.Dispatch<React.SetStateAction<Shifts[]>>;
  shiftTypes: ShiftTypesType[];
  userId: string;
}) {
  return (
    <div className="container">
      <div className="empty"></div>
      {(() => {
        const res = [...Array(31).keys()].map((x) => x + 1);
        return res.map((x) => (
          <div
            key={x}
            className={`header colum-header-${
              x % 7 === 0 ? "seventh" : "week"
            } column-header`}
            data-value={x}
          >
            {" "}
            {x}
          </div>
        ));
      })()}

      {shiftTypes.map((shiftType) => (
        <Row
          key={shiftType.shift_type_id}
          shifts={shifts}
          setShifts={setShifts}
          shiftType={shiftType}
          userId={userId}
        ></Row>
      ))}
    </div>
  );
}

export default Shift;
