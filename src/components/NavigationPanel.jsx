import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavigationPanel({ title }) {

  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink to="/upload_dxf">Upload your DXF</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavigationPanel;