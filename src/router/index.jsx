// router.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import DxfViewerApp from "../views/DxfViewerApp.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <DxfViewerApp /> },
      ],
    },
  ],
  {
    basename: "/static/cadViewer/",
  }
);

export default router;