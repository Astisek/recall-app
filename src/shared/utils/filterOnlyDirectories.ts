import { IFileTreeNode } from '@/electron/models/fileTree';

export const filterOnlyDirectories = (tree: IFileTreeNode): IFileTreeNode => ({
  ...tree,
  children: tree.children?.filter(({ isDirectory }) => isDirectory).map(filterOnlyDirectories),
});
