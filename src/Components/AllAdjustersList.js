import React from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, getDoc, getDocs,query,where } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function AllAdjustersList() {
  const [adjustersList, setAdjustersList] = useState([]);
  let temp = [];
  let querySnapshot = [];
  const getList = async () => {
    querySnapshot = await getDocs(collection(db, "AllAdjustersList"));
    console.log(querySnapshot, typeof querySnapshot);
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), RefID: doc.id });
    });
    console.log(temp); //this line and below line must be put here because of the asyncronous nature of the getList function, if these lines are kept outside of the function then they execute before this function exxecutes, so gives wrong results
    setAdjustersList(temp);
  };
  useEffect(() => {
    getList();
    //the above function is asynchronous
  }, []);
  useEffect(() => {
    console.log(adjustersList, "here");
  }, [adjustersList]);

  async function deleteHandler(RefID) {
    const docsnap = await getDoc(doc(db, "AllAdjustersList", RefID));
    // await deleteDoc(doc(db, "AllAdjustersList", RefID));
    const q = query(
      collection(db, "IdleAdjusters"),
      where("AdjusterID", "==", docsnap.data().AdjusterID)
    );
    console.log(q, "printing q");
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 0) {
      alert("the adjuster is repairing");
      getList();
      return;
    }
    await deleteDoc(doc(db, "IdleAdjusters", querySnapshot.docs[0].id));
    await deleteDoc(doc(db, "AllAdjustersList", RefID));

    getList();
  }

  const displayList = adjustersList.map((obj) => (
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
            <NavLink to="/headhome" className="underline">
              Add Adjusters/Machines
            </NavLink>
          </li>
          <li>
            <NavLink to="/allmachines" className="underline">
              All Machines
            </NavLink>
          </li>
          <li>
            <NavLink to="/alladjusters" className="underline">
              All Adjusters
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics" className="underline">
              Statistics
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1 className="font-bold text-center text-4xl mt-2">
        All Adjusters List
      </h1>
      <div className="border-2 border-black m-6 rounded flex justify-around p-3">
        <p>AdjusterID</p>
        <p>AdjusterName</p>
        <p>Adjuster Expertise</p>
        <p>Delete Button</p>
      </div>
      {displayList}
    </div>
  );
}

export default AllAdjustersList;
