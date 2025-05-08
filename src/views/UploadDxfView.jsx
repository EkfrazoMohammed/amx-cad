import React, { useEffect, useRef, useState } from "react";
import NavigationPanel from "../components/NavigationPanel.jsx";
import Viewer2dContainer from "../components/Viewer2dContainer.jsx";
import * as VIEWER from "dxf-viewer";
// import * as VIEWER from "../../public/libs/dxf-viewer";

// const VIEWER = window;
import { createViewer } from "../utils/ViewerUtils";

function UploadDxfView() {
  const viewerRef = useRef(null);
  const [modelUploader, setModelUploader] = useState(null);
  const [modelUrl, setModelUrl] = useState("");

  useEffect(() => {
    const initViewer = async () => {
      const viewerInstance = await createViewer({
        containerId: "myCanvas",
        enableLayoutBar: true,
        enableSpinner: true,
        enableProgressBar: true,
      });
      // setViewer(viewerInstance);
      setModelUploader(new VIEWER.LocalDxfUploader(viewerInstance));
    };
    initViewer();
  }, []);

  const uploadModelFileBtnClicked = () => {
    modelUploader?.openFileBrowserToUpload();
  };

  useEffect(() => {
    const handleModelLoad = (event) => {
      if (event.detail?.src) {
        setModelUrl(event.detail.src);
      }
    };
    viewerRef.current?.addEventListener("modelLoaded", handleModelLoad);
    return () => viewerRef.current?.removeEventListener("modelLoaded", handleModelLoad);
  }, []);

  return (
    <div className="examples">
      <div className="main">
        {/* <NavigationPanel /> */}
        <Viewer2dContainer modelUrl={modelUrl} />
        <div
          style={{
            position: "absolute",
            top: "40px",
            opacity: 0.6,
            width: "100%",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div className="upload-btn" id="uploadBtn" style={{ pointerEvents: "auto" }}>
            <button id="uploadModelFile" type="button" onClick={uploadModelFileBtnClicked}>
              Click to upload dxf/pdf file(s)
            </button>
            <label htmlFor="uploadModelFile" title="Choose one or more dxf/pdf files to load">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
              >
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
              </svg>
              <span>Upload dxf/pdf</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDxfView;