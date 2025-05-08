import React from "react";
import NavigationPanel from "../components/NavigationPanel.jsx";
import Viewer2dContainer from "../components/Viewer2dContainer.jsx";

function DefaultExampleView() {
  return (
    <div className="examples">
      <div className="examples-main">
        <NavigationPanel />
        <Viewer2dContainer modelUrl="http://localhost:3000/models/dxf/SATTVA_Kaggalipura.dxf" />
      </div>
    </div>
  );
}

export default DefaultExampleView;