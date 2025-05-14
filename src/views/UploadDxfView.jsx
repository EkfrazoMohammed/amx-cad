// // import React, { useEffect, useRef, useState } from "react";
// // import Viewer2dContainer from "../components/Viewer2dContainer.jsx";
// // import * as VIEWER from "dxf-viewer";
// // import { createViewer } from "../utils/ViewerUtils";

// // function UploadDxfView() {
// //   const viewerRef = useRef(null);
// //   const [modelUploader, setModelUploader] = useState(null);
// //   const [modelUrl, setModelUrl] = useState("");
 
  
// //  console.table(modelUploader)
// //   console.table(modelUrl)
// //   useEffect(() => {
// //     const initViewer = async () => {
// //       const viewerInstance = await createViewer({
// //         containerId: "myCanvas",
// //         enableLayoutBar: true,
// //         enableSpinner: true,
// //         enableProgressBar: true,
// //       });
// //       // setViewer(viewerInstance);
// //       setModelUploader(new VIEWER.LocalDxfUploader(viewerInstance));
// //     };
// //     initViewer();
// //   }, []);

// //   const uploadModelFileBtnClicked = () => {
// //     modelUploader?.openFileBrowserToUpload();
// //   };

// //   useEffect(() => {
// //     const handleModelLoad = (event) => {
// //       if (event.detail?.src) {
// //         console.log(event.detail)
// //         setModelUrl(event.detail.src);
// //       }
// //     };
// //     viewerRef.current?.addEventListener("modelLoaded", handleModelLoad);
// //     return () => viewerRef.current?.removeEventListener("modelLoaded", handleModelLoad);
// //   }, []);

// //   return (
// //     <div className="examples">
// //       <div className="main">
// //         {/* <NavigationPanel /> */}
// //         <Viewer2dContainer modelUrl={modelUrl} />
// //         <div
// //           style={{
// //             position: "absolute",
// //             top: "40px",
// //             opacity: 0.6,
// //             width: "100%",
// //             textAlign: "center",
// //             pointerEvents: "none",
// //           }}
// //         >
// //           <div className="upload-btn" id="uploadBtn" style={{ pointerEvents: "auto" }}>
// //             <button id="uploadModelFile" type="button" onClick={uploadModelFileBtnClicked}>
// //               Click to upload dxf/pdf file(s)
// //             </button>
// //             <label htmlFor="uploadModelFile" title="Choose one or more dxf/pdf files to load">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 width="20"
// //                 height="17"
// //                 viewBox="0 0 20 17"
// //               >
// //                 <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
// //               </svg>
// //               <span>Upload CAD file</span>
// //             </label>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default UploadDxfView;

// import React, { useEffect, useRef, useState } from "react";
// import Viewer2dContainer from "../components/Viewer2dContainer.jsx";
// import * as VIEWER from "dxf-viewer";
// import { createViewer } from "../utils/ViewerUtils";

// function UploadDxfView() {
//   const viewerRef = useRef(null);
//   const inputRef = useRef(null);
//   const [modelUploader, setModelUploader] = useState(null);
//   const [modelUrl, setModelUrl] = useState("");
//   const [fileUrl, setFileUrl] = useState("");
//   const [error, setError] = useState(null);
//   console.log(fileUrl)

//   useEffect(() => {
//     const initViewer = async () => {
//       console.log("Step 1: Initializing viewer...");
//       const viewerInstance = await createViewer({
//         containerId: "myCanvas",
//         enableLayoutBar: true,
//         enableSpinner: true,
//         enableProgressBar: true,
//       });
//       viewerRef.current = viewerInstance;
//       console.log("Step 2: Viewer initialized:", viewerInstance);
//       const uploader = new VIEWER.LocalDxfUploader(viewerInstance);
//       setModelUploader(uploader);
//       console.log("Step 3: Model uploader set:", uploader);
//       if (uploader.input) {
//         inputRef.current = uploader.input;
//         console.log("Step 4: Input ref set:", inputRef.current);
//       }
//     };
//     initViewer();
//   }, []);

//   const clearViewer = () => {
//     console.log("Step 5: Clearing viewer...");
//     if (viewerRef.current) {
//       viewerRef.current.loadedModels = [];
//       console.log("Step 6: Loaded models cleared:", viewerRef.current.loadedModels);
//       if (viewerRef.current.sceneManager?.modelGroup) {
//         viewerRef.current.sceneManager.modelGroup.children = [];
//         console.log("Step 7: Scene manager model group cleared:", viewerRef.current.sceneManager.modelGroup.children);
//       }
//       setModelUrl("");
//       console.log("Step 8: Model URL reset to:", modelUrl);
//     }
//   };

//   const uploadModelFileBtnClicked = () => {
//     console.log("Step 9: Manual upload triggered...");
//     clearViewer();
//     modelUploader?.openFileBrowserToUpload();
//   };
//   const loadFileFromUrl = async () => {
//     console.log("Step 10: Loading file from URL:", fileUrl);
//     if (!fileUrl || !inputRef.current) {
//       setError("Please provide a valid URL and ensure the uploader is ready.");
//       console.log("Step 11: Error - Invalid URL or input ref:", { fileUrl, inputRef: inputRef.current });
//       return;
//     }

//     try {
//       setError(null);
//       console.log("Step 12: Error cleared.");
//       clearViewer();
//       console.log("Step 13: Viewer cleared.");

//       // Reset the input element to ensure a fresh state
//       inputRef.current.value = "";
//       console.log("Step 14: Input value reset:", inputRef.current.value);

//       const proxyUrl = `http://localhost:3001/proxy_dxf_view?url=${encodeURIComponent(fileUrl)}`;
//       console.log("Step 15: Fetching from proxy URL:", proxyUrl);
//       const response = await fetch(proxyUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/dxf",
//         },
//       });

//       console.log("Step 16: Fetch response:", response);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch file: ${response.statusText}`);
//       }

//       const blob = await response.blob();
//       console.log("Step 17: Blob received:", blob);
//       const file = new File([blob], "downloaded.dxf", { type: "application/dxf" });
//       console.log("Step 18: File created:", file);

//       const dataTransfer = new DataTransfer();
//       dataTransfer.items.add(file);
//       console.log("Step 19: DataTransfer created with file:", dataTransfer.files);
//       inputRef.current.files = dataTransfer.files;
//       console.log("Step 20: Input files set:", inputRef.current.files);

//       // Trigger the change event to mimic manual upload
//       const changeEvent = new Event("change", { bubbles: true });
//       console.log("Step 21: Dispatching change event...");
//       inputRef.current.dispatchEvent(changeEvent);
//     } catch (error) {
//       console.error("Error loading file from URL:", error);
//       setError(`Error loading file: ${error.message}`);
//       console.log("Step 22: Error occurred:", error.message);
//     }
//   };
 
//   useEffect(() => {
//   const params = new URLSearchParams(window.location.search);
//   const cadUrlParam = params.get("cadurl");

//   if (cadUrlParam) {
//     console.log("Step 0: Found cadurl param:", cadUrlParam);
//     setFileUrl(cadUrlParam);
//   }
// }, []);


//   useEffect(() => {
//     const handleModelLoad = (event) => {
//       console.log("Step 23: Model loaded event:", event.detail);
//       if (event.detail?.src) {
//         setModelUrl(event.detail.src);
//         setError(null);
//         console.log("Step 24: modelUrl updated:", event.detail.src);
//       } else {
//         setError("Model loaded, but no source URL found.");
//         console.log("Step 25: Error - No source URL in model loaded event.");
//       }
//     };

//     const handleError = (event) => {
//       console.error("Viewer error:", event);
//       setError("Viewer error: Unable to load the model.");
//       console.log("Step 26: Viewer error:", event);
//     };

//     console.log("Step 27: Adding event listeners...");
//     viewerRef.current?.addEventListener("modelLoaded", handleModelLoad);
//     viewerRef.current?.addEventListener("error", handleError);
//     return () => {
//       console.log("Step 28: Removing event listeners...");
//       viewerRef.current?.removeEventListener("modelLoaded", handleModelLoad);
//       viewerRef.current?.removeEventListener("error", handleError);
//     };
//   }, []);

//   return (
//     <div className="examples">
//       <div className="main">
//         <Viewer2dContainer modelUrl={modelUrl} />
//         {error && (
//           <div
//             style={{
//               position: "absolute",
//               top: "10px",
//               width: "100%",
//               textAlign: "center",
//               color: "red",
//             }}
//           >
//             {error}
//           </div>
//         )}
//         <div
//           style={{
//             position: "absolute",
//             top: "40px",
//             opacity: 0.6,
//             width: "100%",
//             textAlign: "center",
//             pointerEvents: "none",
//           }}
//         >
//           <div className="upload-btn" id="uploadBtn" style={{ pointerEvents: "auto" }}>
//             <button id="uploadModelFile" type="button" onClick={uploadModelFileBtnClicked}>
//               Click to upload dxf/pdf file(s)
//             </button>
//             <label htmlFor="uploadModelFile" title="Choose one or more dxf/pdf files to load">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="17"
//                 viewBox="0 0 20 17"
//               >
//                 <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
//               </svg>
//               <span>Upload CAD file</span>
//             </label>
//           </div>
//           <div style={{ marginTop: "20px", pointerEvents: "auto" }}>
//             <input
//               type="text"
//               value={fileUrl}
//               onChange={(e) => setFileUrl(e.target.value)}
//               placeholder="Enter DXF file URL"
//               style={{ padding: "5px", marginRight: "10px" }}
//             />
//             <button onClick={loadFileFromUrl}>Load from URL</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadDxfView;
import React, { useEffect, useRef, useState } from "react";
import Viewer2dContainer from "../components/Viewer2dContainer.jsx";
import * as VIEWER from "dxf-viewer";
import { createViewer } from "../utils/ViewerUtils";

function UploadDxfView() {
  const viewerRef = useRef(null);
  const inputRef = useRef(null);
  const [modelUploader, setModelUploader] = useState(null);
  const [modelUrl, setModelUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState(null);
  console.log(fileUrl);

  useEffect(() => {
    const initViewer = async () => {
      console.log("Step 1: Initializing viewer...");
      const viewerInstance = await createViewer({
        containerId: "myCanvas",
        enableLayoutBar: true,
        enableSpinner: true,
        enableProgressBar: true,
      });
      viewerRef.current = viewerInstance;
      console.log("Step 2: Viewer initialized:", viewerInstance);
      const uploader = new VIEWER.LocalDxfUploader(viewerInstance);
      setModelUploader(uploader);
      console.log("Step 3: Model uploader set:", uploader);
      if (uploader.input) {
        inputRef.current = uploader.input;
        console.log("Step 4: Input ref set:", inputRef.current);
      }
    };
    initViewer();
  }, []);

  const clearViewer = () => {
    console.log("Step 5: Clearing viewer...");
    if (viewerRef.current) {
      viewerRef.current.loadedModels = [];
      console.log("Step 6: Loaded models cleared:", viewerRef.current.loadedModels);
      if (viewerRef.current.sceneManager?.modelGroup) {
        viewerRef.current.sceneManager.modelGroup.children = [];
        console.log("Step 7: Scene manager model group cleared:", viewerRef.current.sceneManager.modelGroup.children);
      }
      setModelUrl("");
      console.log("Step 8: Model URL reset to:", modelUrl);
    }
  };

  const uploadModelFileBtnClicked = () => {
    console.log("Step 9: Manual upload triggered...");
    clearViewer();
    modelUploader?.openFileBrowserToUpload();
  };

  const loadFileFromUrl = async () => {
    console.log("Step 10: Loading file from URL:", fileUrl);
    if (!fileUrl || !inputRef.current) {
      setError("Please provide a valid URL and ensure the uploader is ready.");
      console.log("Step 11: Error - Invalid URL or input ref:", { fileUrl, inputRef: inputRef.current });
      return;
    }

    try {
      setError(null);
      console.log("Step 12: Error cleared.");
      clearViewer();
      console.log("Step 13: Viewer cleared.");

      // Reset the input element to ensure a fresh state
      inputRef.current.value = "";
      console.log("Step 14: Input value reset:", inputRef.current.value);

      // const proxyUrl = `http://localhost:3001/proxy_dxf_view?url=${encodeURIComponent(fileUrl)}`;
      const proxyUrl = `https://fibregrid.amxdrones.com/dronecount/proxy_dxf_view/?url=${encodeURIComponent(fileUrl)}`;
      console.log("Step 15: Fetching from proxy URL:", proxyUrl);
      const response = await fetch(proxyUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/dxf",
        },
      });

      console.log("Step 16: Fetch response:", response);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log("Step 17: Blob received:", blob);
      const file = new File([blob], "downloaded.dxf", { type: "application/dxf" });
      console.log("Step 18: File created:", file);

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      console.log("Step 19: DataTransfer created with file:", dataTransfer.files);
      inputRef.current.files = dataTransfer.files;
      console.log("Step 20: Input files set:", inputRef.current.files);

      // Trigger the change event to mimic manual upload
      const changeEvent = new Event("change", { bubbles: true });
      console.log("Step 21: Dispatching change event...");
      inputRef.current.dispatchEvent(changeEvent);
    } catch (error) {
      console.error("Error loading file from URL:", error);
      setError(`Error loading file: ${error.message}`);
      console.log("Step 22: Error occurred:", error.message);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cadUrlParam = params.get("cadurl");

    if (cadUrlParam) {
      console.log("Step 0: Found cadurl param:", cadUrlParam);
      setFileUrl(cadUrlParam);
    }
  }, []);




  useEffect(() => {
    const handleModelLoad = (event) => {
      console.log("Step 23: Model loaded event:", event.detail);
      if (event.detail?.src) {
        setModelUrl(event.detail.src);
        setError(null);
        console.log("Step 24: modelUrl updated:", event.detail.src);
      } else {
        setError("Model loaded, but no source URL found.");
        console.log("Step 25: Error - No source URL in model loaded event.");
      }
    };

    const handleError = (event) => {
      console.error("Viewer error:", event);
      setError("Viewer error: Unable to load the model.");
      console.log("Step 26: Viewer error:", event);
    };

    console.log("Step 27: Adding event listeners...");
    viewerRef.current?.addEventListener("modelLoaded", handleModelLoad);
    viewerRef.current?.addEventListener("error", handleError);
    return () => {
      console.log("Step 28: Removing event listeners...");
      viewerRef.current?.removeEventListener("modelLoaded", handleModelLoad);
      viewerRef.current?.removeEventListener("error", handleError);
    };
  }, []);
  // Trigger loadFileFromUrl immediately after fileUrl is set
  useEffect(() => {
    console.log("Step 2: fileUrl updated:", fileUrl);
    if (fileUrl) {
      loadFileFromUrl();
    }
}, [fileUrl]);
  return (
    <div className="examples">
      <div className="main">
        <Viewer2dContainer modelUrl={modelUrl} />
        {error && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              width: "100%",
              textAlign: "center",
              color: "red",
            }}
          >
            {error}
          </div>
        )}
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
              <span>Upload CAD file</span>
            </label>
          </div>
          <div style={{ marginTop: "20px", pointerEvents: "auto" }}>
            <input
              type="text"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="Enter DXF file URL"
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <button onClick={loadFileFromUrl}>Load CAD viewer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDxfView;
