import React from "react";
import { Route, Routes } from "react-router-dom";
import Home  from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Goals  from "./Pages/Goals";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Wrapper from "./Components/Wrapper";

function App() {
  return (
    <div>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/Dashboard" element={<Wrapper><Dashboard /></Wrapper>} />
         <Route path="/Goals" element={<Wrapper><Goals /></Wrapper>} /> 
         <Route path="/Login" element={<Login />} />
         <Route path="/Register"element={<Register />} />
        <Route path="/Tasks" element={<Wrapper><Tasks /></Wrapper>} />
      </Routes>
    </div>
  );
}

export default App;


