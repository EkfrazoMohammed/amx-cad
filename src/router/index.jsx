import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import UploadDxfView from "../views/UploadDxfView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <UploadDxfView /> }
    ],
  },
]);

export default router;