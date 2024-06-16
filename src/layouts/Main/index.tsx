import "./styles.scss";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

//

const Main = () => {
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

export default Main;
