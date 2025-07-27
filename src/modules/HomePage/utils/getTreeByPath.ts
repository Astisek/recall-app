import { IFileTreeNode } from '@/electron/models/fileTree';

export const getTreeByPath = (tree: IFileTreeNode[], path: string[]) =>
  (
    structuredClone(path).reduce<IFileTreeNode[] | undefined>(
      (acc, item) => acc?.find(({ name }) => name === item)?.children,
      tree,
    ) ?? []
  ).sort((prev, next) => {
    if (prev.isDirectory !== next.isDirectory) {
      return prev.isDirectory ? -1 : 1;
    }
    return next.name.lastIndexOf(prev.name);
  });
