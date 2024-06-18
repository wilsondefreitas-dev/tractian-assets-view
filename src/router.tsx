import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Assets from "./routes/assets.$companyId";

//

const router = createBrowserRouter([
  {
    id: "main",
    path: `/assets`,
    element: <MainLayout.Component />,
    loader: MainLayout.loader,
    children: [
      {
        index: true,
        path: `/assets`,
        element: <NoSelection />,
      },
      {
        index: true,
        path: `/assets/:companyId`,
        element: <Assets.$companyId.Component />,
        loader: Assets.$companyId.loader,
      },
    ],
  },
  { path: "*", loader: () => redirect("/assets") },
]);

export default router;

//

function NoSelection() {
  return (
    <div style={{ textAlign: "right" }}>
      <h3>Bem vindo ao Companies Assets Tree View</h3>
      <p>Selecione uma empresa no menu a cima</p>
    </div>
  );
}
