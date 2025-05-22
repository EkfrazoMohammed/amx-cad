import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import UploadDxfView from "../views/UploadDxfView.jsx";
import DxfViewerApp from "../views/DxfViewerApp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "/", element: <UploadDxfView /> },
      {path:'/',element:<DxfViewerApp />}
    ],
  },
]);

export default router;