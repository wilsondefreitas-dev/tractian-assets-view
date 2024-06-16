import logo from "src/globals/assets/logo.svg";
import Option from "./components/Option";
import { useNavigate } from "react-router-dom";

//

const MainHeader = () => {
  const navigate = useNavigate();

  //

  return (
    <div className="mainHeader">
      <div className="mainHeader__logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Tractiain logo" />
      </div>

      <div className="mainHeader__options">
        <Option label={"Apex Unit"} activated />
        <Option label={"Tobias Unit"} onClick={buildingAlert} />
        <Option label={"Jaguar Unit"} onClick={buildingAlert} />
      </div>
    </div>
  );
};

export default MainHeader;

//

function buildingAlert() {
  if (typeof window !== "object") return;

  window?.alert("Em construção...");
}
