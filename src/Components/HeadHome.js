import React from "react";
import { useState, useEffect } from "react";
import { prevState } from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";

function HeadHome() {
  /*
  let checking;
  function checkHandler(event){
    checking=event.target.value;
    console.log(checking);
  }
  
  function clickHandler(event){
    console.log(checking)
    checking="";
    console.log("button clicked", checking)
  }
  here initially i didnt use the state for the variable checking but i was successful in fetching the value from the input field , but the only problem was when the button is clicked the input field should become empty, when the button is clicked the variable checking is becoming empty but it is not rendering in the input field of the page for this feature we have to use the state i guess
  */
  const [machineData, setMachineDate] = useState({
    MachineID: "",
    MachineType: "",
    MTTF: "",
  });
  const [adjusterData, setadjusterDate] = useState({
    AdjusterID: "",
    AdjusterExpertise: [],
    AdjusterName: "",
  });

  // const [checkboxdata, setCheckboxdata] = useState([]);

  //------------------------------------------------------------------------------------
  function machineIdHandler(event) {
    setMachineDate((prevState) => ({
      ...prevState,
      MachineID: event.target.value,
    }));
  }
  function machineTypeHandler(event) {
    setMachineDate((prevState) => ({
      ...prevState,
      MachineType: event.target.value,
    }));
  }
  function MTTFHandler(event) {
    setMachineDate((prevState) => ({
      ...prevState,
      MTTF: event.target.value,
    }));
  }
  async function submitHandler(event) {
    event.preventDefault();
    console.log(
      "before submitting",
      machineData.MachineID,
      machineData.MachineType
    );

    try {
      const docRef = await addDoc(
        collection(db, "AllMachinesList"),
        machineData
      );
      console.log(machineData);
      const docRefr = await addDoc(
        collection(db, "WorkingMachines"),
        machineData
      );
      console.log("Document written with ID: ", docRef.id, docRefr.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setMachineDate({
      MachineID: "",
      MachineType: "",
      MTTF: "",
    });
  }
  //------------------------------------------------------------------------------

  function adjusterIdHandler(event) {
    setadjusterDate((prevState) => ({
      ...prevState,
      AdjusterID: event.target.value,
    }));
  }
  function adjusterNameHandler(event) {
    setadjusterDate((prevState) => ({
      ...prevState,
      AdjusterName: event.target.value,
    }));
  }
  function adjusterExpertiseHandler(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      setadjusterDate((prevState) => ({
        ...prevState,
        AdjusterExpertise: [
          ...adjusterData.AdjusterExpertise,
          event.target.value,
        ],
      }));
    } else {
      setadjusterDate((prevState) => ({
        ...prevState,
        AdjusterExpertise: adjusterData.AdjusterExpertise.filter(
          (item) => item !== event.target.value
        ),
      }));
    }
  }
  async function adjusterSubmitHandler(event) {
    event.preventDefault();

    console.log("before submitting", adjusterData);
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
    try {
      const docRef = await addDoc(
        collection(db, "AllAdjustersList"),
        adjusterData
      );
      const docRefr = await addDoc(collection(db, "IdleAdjusters"), {
        ...adjusterData,
        Stamp: year + month + date + hour + minutes + seconds,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setadjusterDate({
      AdjusterID: "",
      AdjusterExpertise: [],
      AdjusterName: "",
    });
  }
  // ---------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   console.log("machine id changed", machineData.machineID);
  // }, [machineData.machineID]);
  // useEffect(() => {
  //   console.log("machine type changed", machineData.machineType);
  // }, [machineData.machineType]);
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
      <h1 className="text-center font-bold text-2xl mt-10">Add Machine</h1>
      <form
        onSubmit={submitHandler}
        className="flex justify-around border-2 p-3 mx-3 rounded"
      >
        <div>
          <label htmlFor="machineID">Machine ID</label>
          {/* machine id should be unique for every machine */}
          <input
            type="text"
            id="machineID"
            className="border-2 border-black rounded"
            onChange={machineIdHandler}
            value={machineData.MachineID}
          />
        </div>
        <div>
          <label htmlFor="machineTypeSelect">Choose the type:</label>
          <select
            name="machineTypes"
            id="machineTypeSelect"
            onChange={machineTypeHandler}
            className="border-2 border-black rounded"
            value={machineData.MachineType}
          >
            <option value="">--Please choose an option--</option>
            <option value="Type A">Type A</option>
            <option value="Type B">Type B</option>
            <option value="Type C">Type C</option>
          </select>
        </div>
        <div>
          <label htmlFor="MTTF">MTTF</label>
          <input
            type="text"
            id="MTTF"
            placeholder="  in days"
            onChange={MTTFHandler}
            className="border-2 border-black rounded"
            value={machineData.MTTF}
          />
        </div>
        <button className="border-2 border-black rounded w-14">Add</button>
      </form>

      {/* ------------------------------------------------------------------------------- */}

      <h1 className="text-center font-bold text-2xl mt-28">Add Adjuster</h1>
      <form
        onSubmit={adjusterSubmitHandler}
        className="flex justify-around border-2 p-3 mx-3 rounded items-center"
      >
        <div>
          <label htmlFor="adjusterID">Adjuster ID</label>
          {/* adjuster id should be unique for every machine */}
          <input
            type="text"
            id="adjusterID"
            className="border-2 border-black rounded"
            onChange={adjusterIdHandler}
            value={adjusterData.AdjusterID}
          />
        </div>
        <div>
          <label htmlFor="adjusterName">Adjuster Name</label>
          {/* adjuster id should be unique for every machine */}
          <input
            type="text"
            id="adjusterName"
            className="border-2 border-black rounded"
            onChange={adjusterNameHandler}
            value={adjusterData.AdjusterName}
          />
        </div>
        <div>
          {/* <label htmlFor="adjusterExpertiseSelect">Choose the expertise:</label>
          <select
            name="machineTypes"
            id="adjusterExpertiseSelect"
            onChange={adjusterExpertiseHandler}
            className="border-2 border-black rounded"
            // value={adjusterData.adjusterExpertise}
            multiple
          >
            <option value="">--Please choose an option--</option>
            <option value="Type A">Type A</option>
            <option value="Type B">Type B</option>
            <option value="Type C">Type C</option>
          </select> */}
          <div className="">
            <p>Select Expertise :</p>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="typeA"
                name="expertise"
                value="Type A"
                checked={adjusterData.AdjusterExpertise.includes("Type A")}
                onChange={adjusterExpertiseHandler}
              />
              <label htmlFor="typeA">Type A</label>
              <input
                type="checkbox"
                id="typeB"
                name="expertise"
                value="Type B"
                checked={adjusterData.AdjusterExpertise.includes("Type B")}
                onChange={adjusterExpertiseHandler}
              />
              <label htmlFor="typeB">Type B</label>
              <input
                type="checkbox"
                id="typeC"
                name="expertise"
                value="Type C"
                checked={adjusterData.AdjusterExpertise.includes("Type C")}
                onChange={adjusterExpertiseHandler}
              />
              <label htmlFor="typeC">Type C</label>
            </div>
          </div>
        </div>
        <button className="border-2 border-black rounded w-14">Add</button>
      </form>
    </div>
  );
}

export default HeadHome;
