import React from "react";
import { Route, Routes } from "react-router-dom";
import Home  from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Goals  from "./Pages/Goals";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
         <Route path="/Goals" element={<Goals />} /> 
         <Route path="/Login" element={<Login />} />
         <Route path="/Register"element={<Register />} />
        <Route path="/Tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;


