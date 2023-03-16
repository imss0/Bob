import "./home.css";
import { useEffect } from 'react';
import { getUser } from '../ApiService';
import { useUser } from "@clerk/clerk-react";


function Home() {
  const user = useUser();
  useEffect(() => {
    getUser(user?.user?.id as string).then(res => console.log(res));
  }, [user])

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