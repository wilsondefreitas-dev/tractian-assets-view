import { createBrowserRouter, redirect } from "react-router-dom";
import Layouts from "./layouts";
import Apex from "./routes/apex";

//

const router = createBrowserRouter([
  {
    path: "/apex",
    element: <Layouts.Main />,
    children: [
      {
        index: true,
        path: `/apex`,
        // loader: Home.loader,
        element: <Apex.Component />,
      },
    ],
  },
  { path: "*", loader: () => redirect("/apex") },
]);

export default router;
