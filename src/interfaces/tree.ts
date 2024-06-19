export interface ITree {
  root: ITreeNode;
}

export interface ITreeNode {
  id?: string;
  name?: string;
  parentId?: string;
  locationId?: string;
  parentFound?: boolean;
  sensorType?: string;
  status?: string;
  childrens: ITreeNode[];
  [key: string]: string | boolean | ITreeNode[] | undefined;
}

export interface ITreeRoot {
  childrens: ITreeNode[];
}
