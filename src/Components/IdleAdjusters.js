import React from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { query, orderBy, onSnapshot } from "firebase/firestore";
import { NavLink } from "react-router-dom";

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

function IdleAdjusters() {
  const [idleAdjusters, setIdleAdjusters] = useState([]);

  const getList = async () => {
    let filtered = [];
    const ref = collection(db, "IdleAdjusters");
    const q = query(ref, orderBy("Stamp"));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        filtered.push({ ...doc.data(), RefID: doc.id });
      });
      console.log(filtered[0], filtered[1], "check"); //this line and below line must be put here because of the asyncronous nature of the getList function, if these lines are kept outside of the function(onSnapshot) then they execute before this function exxecutes, so gives wrong results
      setIdleAdjusters(filtered);
    });
  };
  useEffect(() => {
    getList();
    //the above function is asynchronous
  }, []);

  const displayList = idleAdjusters.map((obj) => (
    <div
      key={obj.RefID}
      className="border-2 border-black m-6 rounded flex justify-around p-3 items-center"
    >
      <p>{obj.AdjusterID}</p>
      <p>{obj.AdjusterName}</p>
      {/* <p>{obj.MachineType}</p> */}
      <div>
        {obj.AdjusterExpertise.map((expertise) => (
          <p>{expertise}</p>
        ))}
      </div>
    </div>
  ));
  //error on key

  return (
    <div>
    <nav className="border-2 border-black p-4 bg-purple-400">
        <ul className="flex justify-around ">
          <li>
            <NavLink to="/managerhome" className="underline">
              Working Machines
            </NavLink>
          </li>
          <li>
            <NavLink to="/inoperativemachines" className="underline">
              Inoperative Machines
            </NavLink>
          </li>
          <li>
            <NavLink to="/idleadjusters" className="underline">
              Idle Adjusters
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1 className="font-bold text-center text-4xl mt-2">Idle Adjusters List</h1>
      <div className="border-2 border-black m-6 rounded flex justify-around p-3">
        <p>AdjusterID</p>
        <p>AdjusterName</p>
        <p>Adjuster Expertise</p>
      </div>
      {displayList}
    </div>
  );
}

export default IdleAdjusters;
