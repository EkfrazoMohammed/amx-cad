import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          AMX Fibregrid CAD Viewer
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default App;