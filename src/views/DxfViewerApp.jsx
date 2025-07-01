import React, { useEffect, useRef, useState } from 'react';
import * as VIEWER from 'dxf-viewer';
import { FontFiles } from '../constants/Consts';
import './global.css';
import './iconfont/iconfont.css';
import './iconfont/iconfont2.css';

const DxfViewerApp = () => {
  const viewerRef = useRef(null);
  const toolbarRef = useRef(null);
  const layerManagerRef = useRef(null);
  const markupToolbarRef = useRef(null);
  const exitButtonRef = useRef(null);
  const pdfPageDropdownRef = useRef(null);
  const [markupData, setMarkupData] = useState([]);
  const [measurementData, setMeasurementData] = useState([]);
 
  const language = 'en';
  const isMobile = /mobile/i.test(navigator.userAgent);
 


  useEffect(() => {
    const viewerCfg = {
      containerId: 'myCanvas',
      language,
      enableSpinner: true,
      enableProgressBar: true,
      enableLayoutBar: true,
      enableLocalCache: false,
      toolbarMenuConfig: {
        [VIEWER.ToolbarMenuId.Layers]: {
          onActive: () => {
            console.log('[Toolbar]', 'Activate Layers');
            if (!layerManagerRef.current) {
              layerManagerRef.current = new VIEWER.LayerManagerPlugin(viewerRef.current);
            }
            layerManagerRef.current.show();
          },
          onDeactive: () => {
            console.log('[Toolbar]', 'Deactivate Layers');
            layerManagerRef.current.hide();
          },
          mutexIds: [
            VIEWER.ToolbarMenuId.Measure,
            VIEWER.ToolbarMenuId.MeasureDistance,
            VIEWER.ToolbarMenuId.MeasureArea,
            VIEWER.ToolbarMenuId.MeasureAngle,
            VIEWER.ToolbarMenuId.MeasureCoordinate,
          ],
        },
         // You can add this block if Screenshot is being shown:
  [VIEWER.ToolbarMenuId.Screenshot]: {
    hide: true
  }
      },
    };

    const viewer = new VIEWER.Viewer2d(viewerCfg);
    viewerRef.current = viewer;
    window.viewer = viewer;

    const initializeViewer = async () => {
      await viewer.setFont(FontFiles);

      new VIEWER.AxisGizmoPlugin(viewer, { ignoreZAxis: true });
      new VIEWER.BottomBarPlugin(viewer);
      // new VIEWER.MarkupPlugin(viewer);
      new VIEWER.MeasurementPlugin(viewer, { language });
      // new VIEWER.ScreenshotPlugin(viewer);
      new VIEWER.StatsPlugin(viewer);
      toolbarRef.current = new VIEWER.Viewer2dToolbarPlugin(viewer, { menuConfig: viewerCfg.toolbarMenuConfig, language });

      const modelUploader = new VIEWER.LocalDxfUploader(viewer);
      modelUploader.setPdfWorker('/libs/pdf/pdf.worker.min.js');
      modelUploader.onSuccess = (event) => {
        // if (event && event.compare) {
        //   if (!viewer.dxfComparePanel) {
        //     viewer.dxfComparePanel = new VIEWER.DxfComparePanel(viewer);
        //   }
        // }
        const pdfLoaderPlugin = viewer.findPlugin('PdfLoaderPlugin');
        if (pdfLoaderPlugin) {
          const pageCount = pdfLoaderPlugin.getPageCount();
          createPdfPageDropdown(pageCount, pdfLoaderPlugin);
        }
      };

      viewer.addEventListener(VIEWER.ViewerEvent.LayoutChange, () => {
        const layoutName = viewer.getActiveLayoutName();
        viewer.setMarkups(markupData.filter(markup => markup.layoutName === layoutName));
        viewer.setMeasurements(measurementData.filter(measure => measure.layoutName === layoutName));
      });

      viewer.addEventListener(VIEWER.ViewerEvent.MarkupAdd, (data) => {
        console.log('MarkupAdded', data);
        const layoutName = viewer.getActiveLayoutName();
        data.layoutName = layoutName;
        setMarkupData(prev => {
          const index = prev.findIndex(markup => markup.id === data.id);
          if (index > -1) {
            const newData = [...prev];
            newData.splice(index, 1, data);
            return newData;
          }
          return [...prev, data];
        });
      });

      viewer.addEventListener(VIEWER.ViewerEvent.MarkupUpdate, (data) => {
        console.log('MarkupUpdated', data.oldData, data.newData);
        const layoutName = viewer.getActiveLayoutName();
        data.newData.layoutName = layoutName;
        setMarkupData(prev => {
          const index = prev.findIndex(markup => markup.id === data.newData.id);
          const newData = [...prev];
          newData.splice(index, 1, data.newData);
          return newData;
        });
      });

      viewer.addEventListener(VIEWER.ViewerEvent.MarkupRemove, (data) => {
        console.log('MarkupRemoved', data);
        setMarkupData(prev => prev.filter(markup => markup.id !== data.id));
      });

      viewer.addEventListener(VIEWER.ViewerEvent.MeasurementAdd, (data) => {
        console.log('MeasurementAdded', data);
        const layoutName = viewer.getActiveLayoutName();
        data.layoutName = layoutName;
        setMeasurementData(prev => {
          const index = prev.findIndex(measurement => measurement.id === data.id);
          if (index > -1) {
            const newData = [...prev];
            newData.splice(index, 1, data);
            return newData;
          }
          return [...prev, data];
        });
      });

      viewer.addEventListener(VIEWER.ViewerEvent.MeasurementRemove, (data) => {
        console.log('MeasurementRemoved', data);
        setMeasurementData(prev => prev.filter(measurement => measurement.id !== data.id));
      });

      viewer.addEventListener(VIEWER.ViewerEvent.MeasurementActivate, () => {
        if (isMobile && !exitButtonRef.current) {
          exitButtonRef.current = createMobileExitButton();
        }
        if (exitButtonRef.current) {
          exitButtonRef.current.style.display = 'inline-block';
        }
      });

      viewer.addEventListener(VIEWER.ViewerEvent.MeasurementDeactivate, () => {
        if (exitButtonRef.current) {
          exitButtonRef.current.style.display = 'none';
        }
      });
    };

    initializeViewer();

    return () => {
      viewer.destroy();
    };
  }, [markupData, measurementData]);

  const createMobileExitButton = () => {
    const button = document.createElement('button');
    button.innerText = 'X';
    button.style.cssText = `position: absolute; right: 5%; top: 5%; background-color: #000000; color: #ffffff; padding: 3px 10px; font-weight: bolder;`;
    viewerRef.current.widgetContainer.appendChild(button);
    button.style.display = 'none';
    button.addEventListener('touchstart', () => {
      viewerRef.current.cancelMeasurement();
    });
    return button;
  };

  const createPdfPageDropdown = (pageCount, pdfLoaderPlugin) => {
    if (pdfPageDropdownRef.current) {
      pdfPageDropdownRef.current.remove();
    }
    const div = document.createElement('div');
    div.style.cssText = 'position: absolute; right: 5%; top: 15%; color: #eee; font-size: 20px;';
    let htmlStr = `<label>Select pdf page:</label><select id="selectPage">`;
    for (let i = 0; i < pageCount; i++) {
      htmlStr += `<option value="${i + 1}">${i + 1}</option>`;
    }
    htmlStr += '</select>';
    div.innerHTML = htmlStr;
    document.body.appendChild(div);
    pdfPageDropdownRef.current = div;
    document.getElementById('selectPage').addEventListener('change', (e) => {
      pdfLoaderPlugin.loadPage(Number(e.target.value));
    });
  };

  const handleUploadClick = () => {
    const modelUploader = new VIEWER.LocalDxfUploader(viewerRef.current);
    modelUploader.setPdfWorker('/libs/pdf/pdf.worker.min.js');
    modelUploader.onSuccess = (event) => {
      // if (event && event.compare) {
      //   if (!viewerRef.current.dxfComparePanel) {
      //     viewerRef.current.dxfComparePanel = new VIEWER.DxfComparePanel(viewerRef.current);
      //   }
      // }
      const pdfLoaderPlugin = viewerRef.current.findPlugin('PdfLoaderPlugin');
      if (pdfLoaderPlugin) {
        const pageCount = pdfLoaderPlugin.getPageCount();
        createPdfPageDropdown(pageCount, pdfLoaderPlugin);
      }
    };
    modelUploader.openFileBrowserToUpload();
  };

   const [fileUrl, setFileUrl] = useState("");


//  useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     // const cadUrlParam = params.get("cadurl");
//     const cadUrlParam = params.get("fileUrl");
//     if (cadUrlParam) {
//       console.log("Step 0: Found cadurl param:", cadUrlParam);
//       setFileUrl(cadUrlParam);
//     }
//   }, []);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const cadUrlParam = params.get("fileUrl");
  if (cadUrlParam && /\.(dxf|dwg)$/i.test(cadUrlParam)) {
    console.log("Step 0: Found valid cadurl param:", cadUrlParam);
    setFileUrl(cadUrlParam);
    viewerRef.current.loadModel({ src: cadUrlParam, merge: true }).then(() => {
      console.log(`[Demo] Loaded model ${cadUrlParam}`);
    });
  }
}, []);
  const handleLoadDxf = () => {
    const url = document.getElementById('fileUrlInput')?.value;
    if (url) {
      viewerRef.current.loadModel({ src: url, merge: true }).then(() => {
        console.log(`[Demo] Loaded model ${url}`);
      });
    }
  };

  return (
    <div id="app">
      <div id="myCanvas" style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />
      <div
        style={{
          position: 'absolute',
          top: '10px',
          opacity: 0.6,
          width: '100%',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* <div className="upload-btn" style={{ pointerEvents: 'auto' }}>
          <button
            id="uploadModelFile"
            type="button"
            style={{ width: '0.1px', height: '0.1px', opacity: 0 }}
            onClick={handleUploadClick}
          >
            Click to upload dxf/pdf file(s)
          </button>
          <label
            htmlFor="uploadModelFile"
            title="Choose one or more dxf/pdf files to load"
            style={{
              color: '#353535',
              background: 'gray',
              border: 0,
              borderRadius: '3px',
              fontSize: '1rem',
              fontWeight: 700,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-block',
              overflow: 'hidden',
              padding: '0.625rem 1.25rem',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
              style={{
                width: '1em',
                height: '1em',
                verticalAlign: 'middle',
                fill: 'currentColor',
                marginTop: '-0.25em',
                marginRight: '0.25em',
              }}
            >
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
            </svg>
            <span>Upload dxf</span>
          </label>
        </div> */}
        {/* <div
          style={{
            marginTop: '1em',
            pointerEvents: 'auto',
            width: 'fit-content',
            left: 'calc(50% - 200px)',
            position: 'absolute',
          }}
        >
          <input
            id="fileUrlInput"
             value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            style={{ display: 'inline-block', width: '20em', height: '2em' }}
          />
          <button
            style={{
              width: '8em',
              height: '2em',
              color: '#fff',
              opacity: 1,
              background: '#000',
              cursor: 'pointer',
            }}
            onClick={handleLoadDxf}
          >
            Load dxf
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DxfViewerApp;