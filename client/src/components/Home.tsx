import "./home.css";
import { useUser } from "@clerk/clerk-react";

function Home() {
  const user = useUser();

  return (
    <>
      <div className="bgr">
        <h1>Bob</h1>
        <div className="description">
          <h2>A shift planner for busy professionals</h2>
          <p>
            - This app generates shifts for <u>4 weeks (28days)</u>
          </p>
          <p>
            - Employees have the right to{" "}
            <u>11 hours rest between working days.</u> This app takes into
            account this rule. Therefore, the shifts created by this app are
            designed to comply with the rest rights of employees.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
