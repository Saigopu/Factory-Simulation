import React from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc, getDoc,addDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";


function ManagerHome() {
  const [workingMachines, setWorkingMachines] = useState([]);
  let temp = [];
  let querySnapshot = [];
  const getList = async () => {
    querySnapshot = await getDocs(collection(db, "WorkingMachines"));
    // console.log(querySnapshot, typeof querySnapshot);
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), RefID: doc.id });
    });
    setWorkingMachines(temp);
  };
  useEffect(() => {
    getList();
    //the above function is asynchronous
  }, []);
  useEffect(() => {
    console.log(workingMachines, "here");
  }, [workingMachines]);

  async function addHandler(RefID) {
    const docRef = doc(db, "WorkingMachines", RefID); //here we are getting the reference to the document the RefID is the one we see as the document in the collection
    const docSnap = await getDoc(docRef);// this is the machine the manager wants to add to the inoperative machines
    console.log(docSnap.data(),"this is the machine u clicked");
    const nowTime=new Date();
    const year=`${nowTime.getFullYear()}`;
    let month=`${nowTime.getMonth()}`;
    month=month.length===1?"0"+month:month;
    let date=`${nowTime.getDate()}`;
    date=date.length===1?"0"+date:date;
    let hour=`${nowTime.getHours()}`;
    hour=hour.length===1?"0"+hour:hour;
    let minutes=`${nowTime.getMinutes()}`;
    minutes=minutes.length===1?"0"+minutes:minutes;
    let seconds=`${nowTime.getSeconds()}`;
    seconds=seconds.length===1?"0"+seconds:seconds;
    
    try {
      const docRef = await addDoc(collection(db, "InoperativeMachines"), {
        ...docSnap.data(),
        Stamp: (year+month+date+hour+minutes+seconds),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    await deleteDoc(doc(db, "WorkingMachines", RefID));
    getList();
  }

  const displayList = workingMachines.map((obj) => (
    <div
      key={obj.RefID}
      className="border-2 border-black m-6 rounded flex justify-around p-3"
    >
      <p>{obj.MachineID}</p>
      <p>{obj.MachineType}</p>
      <p>{obj.MTTF}</p>
      <button
        className="border-2 border-black rounded"
        onClick={() => addHandler(obj.RefID)}
      >
        Add
      </button>
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
      <h1 className="font-bold text-center text-4xl mt-2">Working Machines List</h1>
      <div className="border-2 border-black m-6 rounded flex justify-around p-3">
        <p>MachineID</p>
        <p>MachineType</p>
        <p>MTTF</p>
        <p>Add Button</p>
      </div>
      {displayList}
    </div>
  );
}

export default ManagerHome;
