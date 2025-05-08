import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
// import * as VIEWER from "dxf-viewer";
// import * as VIEWER from "../../public/libs/dxf-viewer";
import NavigationPanel from "../components/NavigationPanel.jsx";
// import { ExamplesContext } from "../context/ExamplesContext";
import { createViewer } from "../utils/ViewerUtils";

function ExampleView0({ modelUrl }) {
  // const { examples } = useContext(ExamplesContext);
  const location = useLocation();
  const route = location.pathname;
  const viewerRef = useRef(null);
  const [viewer, setViewer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initViewer = async () => {
      const viewerInstance = await createViewer({
        containerId: "myCanvas",
        enableLayoutBar: true,
        enableSpinner: true,
        enableProgressBar: true,
      });
      setViewer(viewerInstance);
    };
    initViewer();
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      if (!viewer) return;

      // const exampleId = route.replace("/", "");
      // let example = examples.find((exam) => exam.id === exampleId);
      // if (!example) {
      //   example = examples[0];
      //   console.warn(`Failed to find example with id '${exampleId}', using first example: ${example?.id}`);
      // }

      // const modelCfg = example?.models[0] || { src: modelUrl, modelId: "default" };
      // modelCfg.src = import.meta.env.BASE_URL + modelCfg.src;
      // console.log("Going to load", modelCfg.src);

      // const onProgress = (event) => {
      //   const progress = ((event.loaded * 100) / event.total).toFixed(1);
      //   // console.log(`Loading model with id '${modelCfg.modelId}' progress: ${progress}%`);
      // };

      try {
        // await viewer.loadModel(modelCfg, onProgress);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load model:", err);
      }
    };

    // if (examples.length) 
      loadModel();
  }, [viewer, route, modelUrl]);

  return (
    <div className="examples">
      <div className="main">
        <NavigationPanel />
        <div className="viewer-container" id="myCanvas" ref={viewerRef}>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default ExampleView0;