import React, { useRef } from "react";
function Viewer2dContainer({ modelUrl }) {
  const viewerRef = useRef(null);
  return (
    <>
      <div className="viewer-container" id="myCanvas" ref={viewerRef}>
      </div>
    </>
  );
}

export default Viewer2dContainer;