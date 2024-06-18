import { ITreeNode } from "src/interfaces/tree";
import TreeNode from "./TreeNode";

//

const DataTree = ({ data }: { data: ITreeNode[] }) => {
  return (
    <>
      {data?.map((value) => {
        return <TreeNode key={value?.id} data={value} />;
      })}
    </>
  );
};

export default DataTree;
