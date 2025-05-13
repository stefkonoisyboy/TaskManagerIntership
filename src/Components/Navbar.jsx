import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
        <a href="/">Home</a>
      <ul className="navbar-links">
        <li><a href="/createTask">Create Task</a></li>
        <li><a href="/deteleTask">Delete Task</a></li>
      </ul>
    </nav>
  );
}