import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import DxfViewerApp from "../views/DxfViewerApp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path:'/',element:<DxfViewerApp />}
    ],
  },
]);

export default router;