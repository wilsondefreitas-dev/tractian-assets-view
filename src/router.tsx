import { createBrowserRouter, redirect } from "react-router-dom";
import Apex from "./routes/apex";
import MainLayout from "./layouts/MainLayout";

//

const router = createBrowserRouter([
  {
    id: "main",
    element: <MainLayout.Component />,
    loader: MainLayout.loader,
    children: [
      {
        index: true,
        path: `/assets/:companyName`,
        // loader: Home.loader,
        element: <Apex.Component />,
      },
    ],
  },
  { path: "*", loader: () => redirect("/assets/apex") },
]);

export default router;
