import "./styles.scss";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import apiHandler from "src/services/ApiHandler";
import { MainLayoutLoaderData } from "src/interfaces/mainLayout";

//

async function loader(): Promise<MainLayoutLoaderData> {
  const companies = apiHandler.getCompanies();

  return {
    promises: { companies },
  };
}

//

const Component = () => {
  return (
    <div className="mainLayout">
      <Header />
      <div className="mainLayout__container">
        <div className="mainLayout__box">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default {
  Component,
  loader,
};

//
