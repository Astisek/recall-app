import { IFileTreeNode } from '@/electron/models/fileTree';

export const getTreeByPath = (tree: IFileTreeNode[], path: string[]) => {
  const nodes =
    structuredClone(path).reduce<IFileTreeNode[] | undefined>(
      (acc, item) => acc?.find(({ name }) => name === item)?.children,
      tree,
    ) ?? [];

  nodes.sort((prev, next) => {
    if (prev.isDirectory !== next.isDirectory) {
      return prev.isDirectory ? -1 : 1;
    }
    return prev.name.localeCompare(next.name);
  });

  return nodes;
};
