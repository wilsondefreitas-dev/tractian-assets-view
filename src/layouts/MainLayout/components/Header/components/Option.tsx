import treeIcon from "src/globals/assets/tree.svg";
import classNames from "classnames";
import { IOptionsProps } from "src/interfaces/header";
import { useNavigate } from "react-router-dom";

//

const Option = ({ company }: IOptionsProps) => {
  const navigate = useNavigate();
  const optionClasses = classNames("mainHeader__option", {
    activated: isActivated(),
  });

  //

  function handleOnClick() {
    const lowerCaseName = company?.name.toLocaleLowerCase();

    navigate(`/assets/${lowerCaseName}`);
  }

  function isActivated() {
    if (typeof window !== "object") return;

    const lowerCaseName = company?.name.toLocaleLowerCase();
    const curPath = window.location.pathname?.split("/")[2];

    return curPath === lowerCaseName;
  }

  //

  return (
    <button onClick={handleOnClick} className={optionClasses}>
      <img src={treeIcon} alt="Tree icon" />
      <span>{`${company?.name} Unit`}</span>
    </button>
  );
};

export default Option;
