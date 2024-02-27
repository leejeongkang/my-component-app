interface Data {
  name?: string;
  id?: string | number;
  children?: Data[];
  checked?: boolean;
  selected?: boolean;
  expanded?: boolean;
  disabled?: boolean; // When disabled, an item can neither be selected or checked
  meta?: any; // provides meta-data of any type per node.
  user?: string;
  connect?: string;
}

export class TreeNode {
  name?: string;
  id?: string | number;
  children?: TreeNode[];
  constructor(data: Data) {
    this.name = data.name;
    this.id = typeof data.id === "undefined" ? new Date().valueOf() : data.id;
    this.children = [];
  }
  public changeNodeName(name: string) {
    this.name = name;
  }

  addChildren(children: TreeNode | TreeNode[]) {}
}

export class Tree {
  root: TreeNode;
  constructor(data: Data[]) {
    this.root = new TreeNode({ name: "root", children: [], id: "id" });
    this.initNode(this.root, data);
    // @ts-ignore
    return this.root;
  }

  initNode(node: TreeNode, data: Data[]) {
    for (let i = 0; i < data.length; i++) {
      const _data = data[i];

      const child = new TreeNode(_data);
      if (_data.children && _data.children.length > 0) {
        this.initNode(child, _data.children);
      }
      node.addChildren(child);
    }
  }
}
