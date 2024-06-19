import classNames from "classnames";
import { useMemo, useState } from "react";
import { ITreeNode } from "src/interfaces/tree";
import arrowIcon from "src/globals/assets/arrow.svg";
import locationIcon from "src/globals/assets/location.svg";
import assetBoxIcon from "src/globals/assets/assetBox.svg";
import greenThunderIcon from "src/globals/assets/greenThunder.svg";
import greenDotIcon from "src/globals/assets/greenDot.svg";
import assetIcon from "src/globals/assets/asset.png";
import DataTree from "./DataTree";

//

const TreeNode = ({ data }: { data: ITreeNode }) => {
  const [opened, setOpened] = useState(false);
  const typeIcon = useMemo(getTypeIcon, [data]);
  const sensorIcon = useMemo(getSensorIcon, [data]);
  const arrowClasses = classNames("treeNode__arrow", { opened });
  const sensorIconClasses = classNames("treeNode__sensorIcon", {
    operating: data?.status === "operating",
  });

  //

  function handleOnClick() {
    if (data?.childrens?.length > 0) setOpened(!opened);
  }

  function getTypeIcon() {
    if (data?.sensorType !== null && data?.sensorType !== undefined) {
      return assetIcon;
    }

    if (data?.locationId || data?.sensorType === null) {
      return assetBoxIcon;
    }

    return locationIcon;
  }

  function getSensorIcon() {
    if (data?.sensorType === "energy") {
      return greenThunderIcon;
    }

    return greenDotIcon;
  }

  //

  const hasStatus = data?.sensorType || data?.status;

  return (
    <div
      className="treeNode"
      title={data?.sensorType && `${data?.sensorType} sensor`}
    >
      <div className="treeNode__option" onClick={handleOnClick}>
        {data?.childrens?.length > 0 && (
          <img className={arrowClasses} src={arrowIcon} />
        )}

        <img src={typeIcon} />

        <span>{data?.name}</span>

        {hasStatus && <img className={sensorIconClasses} src={sensorIcon} />}
      </div>

      {opened && (
        <div className="treeNode__childrenWrapper">
          <DataTree data={data?.childrens} />
        </div>
      )}
    </div>
  );
};

export default TreeNode;
