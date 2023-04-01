import React from "react";
import { useState, useEffect } from "react";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";

function AdjusterHome() {
  const [assignedList, setAssignedList] = useState([]);
  async function getList() {
    const querySnapshot = await getDocs(collection(db, "AssignedList"));
    let temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), RefID: doc.id });
    });
    setAssignedList(temp);
  }

  async function completedHandler(RefID) {
    const docref = doc(db, "AssignedList", RefID);
    const docsnap = await getDoc(docref);
    const nowTime = new Date();
    const year = `${nowTime.getFullYear()}`;
    let month = `${nowTime.getMonth()}`;
    month = month.length === 1 ? "0" + month : month;
    let date = `${nowTime.getDate()}`;
    date = date.length === 1 ? "0" + date : date;
    let hour = `${nowTime.getHours()}`;
    hour = hour.length === 1 ? "0" + hour : hour;
    let minutes = `${nowTime.getMinutes()}`;
    minutes = minutes.length === 1 ? "0" + minutes : minutes;
    let seconds = `${nowTime.getSeconds()}`;
    seconds = seconds.length === 1 ? "0" + seconds : seconds;
    await addDoc(collection(db, "IdleAdjusters"), {
      AdjusterID:docsnap.data().AdjusterID,
      AdjusterName:docsnap.data().AdjusterName,
      AdjusterExpertise:docsnap.data().AdjusterExpertise,
      Stamp:(year+month+date+hour+minutes+seconds)
    });
    await addDoc(collection(db,"WorkingMachines"),{
      MachineID:docsnap.data().MachineID,
      MachineType:docsnap.data().MachineType,
      MTTF:docsnap.data().MTTF
    })
    await deleteDoc(doc(db,"AssignedList",RefID));
    getList();
  }

  const displayList = assignedList.map((obj) => (
    <div
      key={obj.RefID}
      className="border-2 border-black m-6 rounded flex justify-around p-1 items-center"
    >
      <p>{obj.MachineID}</p>
      <p>{obj.MachineType}</p>
      <p>{obj.MTTF}</p>
      <p>{obj.AdjusterID}</p>
      <p>{obj.AdjusterName}</p>
      <div>
        {obj.AdjusterExpertise.map((expertise) => (
          <p>{expertise}</p>
        ))}
      </div>
      <button
        className="border-2 border-black rounded"
        onClick={() => completedHandler(obj.RefID)}
      >
        Completed
      </button>
    </div>
  ));

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-center text-4xl">Assigned List</h1>
      <div className="border-2 border-black m-6 rounded flex justify-around p-1">
        <p>MachineID</p>
        <p>MachineType</p>
        <p>MTTF</p>
        <p>AdjusterID</p>
        <p>AdjusterName</p>
        <p>Adjuster Expertise</p>
        <p>Completed?</p>
      </div>
      {displayList}
    </div>
  );
}

export default AdjusterHome;
