import logo from "src/globals/assets/logo.svg";
import Option from "./components/Option";
import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { MainLayoutLoaderData } from "src/types/mainLayout";
import { ICompany } from "src/interfaces/apiData";

//

const MainHeader = () => {
  const navigate = useNavigate();
  const { promises } = useRouteLoaderData("main") as MainLayoutLoaderData;

  //

  return (
    <div className="mainHeader">
      <div className="mainHeader__logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Tractiain logo" />
      </div>

      <Suspense>
        <Await resolve={promises?.companies}>
          {(companies) => {
            return (
              <div className="mainHeader__options">
                {companies?.map((company: ICompany) => (
                  <Option key={company?.id} company={company} />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default MainHeader;
