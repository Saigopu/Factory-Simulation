import "./App.css";
import MainHome from "./Components/MainHome";
import HeadHome from "./Components/HeadHome";
import AdjusterHome from "./Components/AdjusterHome";
import ManagerHome from "./Components/ManagerHome";
import AllMachineList from "./Components/AllMachineList";
import AllAdjustersList from "./Components/AllAdjustersList";
import Statistics from "./Components/Statistics";
import IdleAdjusters from "./Components/IdleAdjusters";
import InoperativeMachines from "./Components/InoperativeMachines";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./Components/NotFoundPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/headhome" element={<HeadHome />} />
        <Route path="/managerhome" element={<ManagerHome />} />
        <Route path="/adjusterhome" element={<AdjusterHome />} />
        <Route path="/idleadjusters" element={<IdleAdjusters />} />
        <Route path="/inoperativemachines" element={<InoperativeMachines />} />
        <Route path="/allmachines" element={<AllMachineList />} />
        <Route path="/alladjusters" element={<AllAdjustersList />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
