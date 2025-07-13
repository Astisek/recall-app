export interface IFileTreeNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: IFileTreeNode[];
}
