import React from "react";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";
import { query, orderBy, onSnapshot } from "firebase/firestore";
import { NavLink } from "react-router-dom";

function InoperativeMachines() {
  const [inoperativeMachines, setInoperativeMachines] = useState([]);

  async function getList() {
    let filtered = [];
    const ref = collection(db, "InoperativeMachines");
    const q = query(ref, orderBy("Stamp"));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        filtered.push({ ...doc.data(), RefID: doc.id });
      });
      console.log(filtered[0], filtered[1], "check"); //this line and below line must be put here because of the asyncronous nature of the getList function, if these lines are kept outside of the function(onSnapshot) then they execute before this function executes, so gives wrong results
      setInoperativeMachines(filtered);
    });
  }

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    console.log(inoperativeMachines);
  }, [inoperativeMachines]);

  async function assignHandler(RefID, type) {
    let filtered = [];
    let adj = "no";
    const ref = collection(db, "IdleAdjusters");
    const q = query(ref, orderBy("Stamp"));
    // const docRef = doc(db, "InoperativeMachines", RefID);
    // const docSnap = await getDoc(docRef);
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        filtered.push({ ...doc.data(), RefID: doc.id });
      });
      for (let temp of filtered) {
        if (temp.AdjusterExpertise.includes(type)) {
          adj = { ...temp, MRefID: RefID };
          break;
        }
      }
      if (adj === "no") {
        alert("adjuster not available");
      } else {
        editCollections(adj);
      }
    });
  }

  async function editCollections(adjuster) {
    const docRef = doc(db, "InoperativeMachines", adjuster.MRefID);
    const docSnap = await getDoc(docRef);
    try {
      const docRef = await addDoc(collection(db, "AssignedList"), {
        AdjusterName: adjuster.AdjusterName,
        AdjusterExpertise: adjuster.AdjusterExpertise,
        AdjusterID: adjuster.AdjusterID,
        MachineID: docSnap.data().MachineID,
        MachineType: docSnap.data().MachineType,
        MTTF: docSnap.data().MTTF,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    await deleteDoc(docRef);
    await deleteDoc(doc(db, "IdleAdjusters", adjuster.RefID));
    getList();
  }

  const displayList = inoperativeMachines.map((obj) => (
    <div
      key={obj.RefID}
      className="border-2 border-black m-6 rounded flex justify-around p-3"
    >
      <p>{obj.MachineID}</p>
      <p>{obj.MachineType}</p>
      <p>{obj.MTTF}</p>
      <button
        className="border-2 border-black rounded"
        onClick={() => assignHandler(obj.RefID, obj.MachineType)}
      >
        Assign
      </button>
    </div>
  ));

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
      <h1 className="font-bold text-center text-4xl mt-2">
        Inoperative Machines List
      </h1>
      <div className="border-2 border-black m-6 rounded flex justify-around p-3">
        <p>MachineID</p>
        <p>MachineType</p>
        <p>MTTF</p>
        <p>Assign Button</p>
      </div>
      {displayList}
    </div>
  );
}

export default InoperativeMachines;
