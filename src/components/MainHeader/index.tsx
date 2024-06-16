import "./styles.scss";
import logo from "src/assets/logo.svg";
import Option from "./components/Option";

//

const MainHeader = () => {
  return (
    <div className="mainHeader">
      <img src={logo} alt="Tractiain logo" />

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
