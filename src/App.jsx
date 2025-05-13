import { Route, Routes } from "react-router";
import { Home } from "./Pages/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <div>
        <Routes></Routes>
      </div>
    </div>
  );
}

export default App;
