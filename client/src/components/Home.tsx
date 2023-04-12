import "./home.css";
import { useUser } from "@clerk/clerk-react";

function Home() {
  const user = useUser();

  return (
    <>
      <div className="bgr">
        <h1>Bob</h1>
        <p>A shift planner for busy medical professionals</p>
      </div>
    </>
  );
}

export default Home;
