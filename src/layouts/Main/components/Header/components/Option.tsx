import treeIcon from "src/globals/assets/tree.svg";
import classNames from "classnames";

//

const Option = ({ label, activated, onClick }: IOptionsProps) => {
  const optionnClasses = classNames("mainHeader__option", {
    activated: activated,
  });

  //

  function handleOnClick() {
    if (typeof onClick !== "function") return;

    onClick();
  }

  //

  return (
    <button onClick={handleOnClick} className={optionnClasses}>
      <img src={treeIcon} alt="Tree icon" />
      <span>{label}</span>
    </button>
  );
};

export default Option;

//

interface IOptionsProps {
  label: string;
  activated?: boolean;
  onClick?: () => void;
}
