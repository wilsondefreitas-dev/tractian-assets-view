import { ITreeNode, ITreeRoot } from "src/interfaces/tree";

//

onmessage = (event) => {
  const tree = new Tree(event?.data);
  postMessage(tree);
};

/**
 * @TODO: split classes into another file
 *
 * this file is used as a worker. all the necessary
 * classes are inside of it to avoid the need to
 * setup a new configuration to possibility using
 * import in files that are not a module.
 */

class Tree {
  root;

  //

  constructor(elements: ITreeNode[]) {
    this.root = new Root(elements);

    const withParent = elements?.filter((d) => d?.parentId || d?.locationId);

    console.time("testing");
    this.addNodes(this.root, withParent);
    console.timeEnd("testing");
  }

  //

  addNodes(where: ITreeRoot | ITreeNode, elements: ITreeNode[]) {
    //iterate the itens already on the tree
    for (let i = 0; i < where?.childrens?.length; i++) {
      const whereChild = where?.childrens[i];
      const childrens = [];

      for (let w = 0; w < elements?.length; w++) {
        const child = elements[w];

        if (
          child?.parentId === whereChild?.id ||
          child?.locationId === whereChild?.id
        ) {
          child.parentFound = true;
          child.childrens = [];
          childrens.push(child);
          elements.splice(w--, 1);
        }
      }

      //add then as a children
      if (childrens.length > 0) {
        whereChild.childrens.push(...childrens);
      }
    }

    if (elements?.length > 0) {
      //get itens that parent was not found and look again for them
      for (let i = 0; i < where?.childrens.length; i++) {
        const whereChild = where?.childrens[i];
        this.addNodes(whereChild, elements);
      }
    }
  }
}

//

class Root {
  childrens: ITreeNode[] = [];

  //

  constructor(elements: ITreeNode[]) {
    //construct root only with items with no parent or location
    const rootData = elements?.filter((d) => !d?.parentId && !d?.locationId);

    for (let i = 0; i < rootData.length; i++) {
      const element = rootData[i];
      this.add(element);
    }
  }

  //

  add(element: ITreeNode) {
    this.childrens.push({ ...element, childrens: [] });
  }
}
