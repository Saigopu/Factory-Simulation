import React from 'react'
import { NavLink } from 'react-router-dom';


function Statistics() {
  return (
    <div className=''>
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
        <h1 className='font-bold text-center text-4xl mt-32'>Statistics, need to work on this </h1>
    </div>
  )
}


export default Statistics;