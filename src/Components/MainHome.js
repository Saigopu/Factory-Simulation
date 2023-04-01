import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MainHome() {
    const navigate=useNavigate();
  return (
    <div className="my-40"> 
      <div className="flex flex-col gap-4 border-2 border-black items-center py-5">
        <button className="border-2 border-black rounded w-40 h-14"><NavLink to="/adjusterhome">Login as adjuster</NavLink></button>
        <button className="border-2 border-black rounded w-40 h-14"><NavLink to="/managerhome">Login as Manager</NavLink></button>
        <button onClick={()=>navigate("/headhome")} className="border-2 border-black rounded w-40 h-14">Login as Head</button>
      </div>
    </div>
  );
}

export default MainHome;
