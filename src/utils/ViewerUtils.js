// import * as VIEWER from "../../public/libs/dxf-viewer";
// const VIEWER = window;
import * as VIEWER from "dxf-viewer";
import { FontFiles } from "../constants/Consts";

export const createViewer = async (viewerCfg = {}) => {
  console.log("Initializing viewer...");
  viewerCfg = {
    containerId: "myCanvas",
    enableLayoutBar: true,
    enableSpinner: true,
    enableProgressBar: true,
    ...viewerCfg,
  };

  const viewer = new VIEWER.Viewer2d(viewerCfg);

  const menuConfig = {
    [VIEWER.ToolbarMenuId.Settings]: {
      onActive: () => alert("API is ready, but UI is not implemented yet!"),
      onDeactive: () => {},
      mutexIds: [
        VIEWER.ToolbarMenuId.Measure,
        VIEWER.ToolbarMenuId.MeasureDistance,
        VIEWER.ToolbarMenuId.MeasureArea,
        VIEWER.ToolbarMenuId.MeasureAngle,
        VIEWER.ToolbarMenuId.MeasureCoordinate,
      ],
    },
    [VIEWER.ToolbarMenuId.Layers]: {
      onActive: () => alert("API is ready, but UI is not implemented yet!"),
      onDeactive: () => {},
      mutexIds: [
        VIEWER.ToolbarMenuId.Measure,
        VIEWER.ToolbarMenuId.MeasureDistance,
        VIEWER.ToolbarMenuId.MeasureArea,
        VIEWER.ToolbarMenuId.MeasureAngle,
        VIEWER.ToolbarMenuId.MeasureCoordinate,
      ],
    },
  };

  new VIEWER.AxisGizmoPlugin(viewer, { ignoreZAxis: true });
  new VIEWER.BottomBarPlugin(viewer);
  new VIEWER.MarkupPlugin(viewer);
  new VIEWER.MeasurementPlugin(viewer);
  new VIEWER.ScreenshotPlugin(viewer);
  new VIEWER.StatsPlugin(viewer);
  new VIEWER.HotpointPlugin(viewer);
  new VIEWER.Viewer2dToolbarPlugin(viewer, { menuConfig });

  viewer.setFont([]);
  const fontManager = viewer.getFontManager();
  if (fontManager) fontManager.enableFontCache = false;

  await viewer.setFont(FontFiles);
  return viewer;
};