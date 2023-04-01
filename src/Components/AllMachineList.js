import React from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function AllMachineList() {
  const [machinesList, setMachinesList] = useState([]);
  let temp = [];
  let querySnapshot = [];
  const getList = async () => {
    querySnapshot = await getDocs(collection(db, "AllMachinesList"));
    // console.log(querySnapshot, typeof querySnapshot);
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), RefID: doc.id });
    });
    setMachinesList(temp);
  };
  useEffect(() => {
    getList();
    //the above fuction is asynchronous
  }, []);
  useEffect(() => {
    console.log(machinesList, "here");
  }, [machinesList]);

  async function deleteHandler(RefID) {
    await deleteDoc(doc(db, "AllMachinesList", RefID));
    getList();
  }

  const displayList = machinesList.map((obj) => (
    <div
      key={obj.RefID}
      className="border-2 border-black m-6 rounded flex justify-around p-3"
    >
      <p>{obj.MachineID}</p>
      <p>{obj.MachineType}</p>
      <p>{obj.MTTF}</p>
      <button
        className="border-2 border-black rounded"
        onClick={() => deleteHandler(obj.RefID)}
      >
        Delete
      </button>
    </div>
  ));
  //error on key

  return (
    <div>
      <nav className="border-2 border-black p-4 bg-pink-300">
        <ul className="flex justify-around ">
          <li>
            <NavLink to="/headhome" className="underline">Add Adjusters/Machines</NavLink>
          </li>
          <li>
            <NavLink to="/allmachines" className="underline">All Machines</NavLink>
          </li>
          <li>
            <NavLink to="/alladjusters" className="underline">All Adjusters</NavLink>
          </li>
          <li>
            <NavLink to="/statistics" className="underline">Statistics</NavLink>
          </li>
        </ul>
      </nav>
      <h1 className="font-bold text-center text-4xl mt-2">All Machines List</h1>
      <div className="border-2 border-black m-6 rounded flex justify-around p-3">
        <p>MachineID</p>
        <p>MachineType</p>
        <p>MTTF</p>
        <p>Delete Button</p>
      </div>
      {displayList}
    </div>
  );
}

export default AllMachineList;
