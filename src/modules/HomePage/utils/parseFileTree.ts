import { IFileTreeNode } from '@/electron/models/fileTree';

export const parseFileTree = (tree: IFileTreeNode[]) =>
  tree.reduce(
    (acc, item) => {
      const checkItem = (fileTree: IFileTreeNode) => {
        if (fileTree.isDirectory) {
          acc.directories++;
          fileTree.children?.forEach(checkItem);
        } else {
          acc.items++;
        }
      };
      checkItem(item);

      return acc;
    },
    { items: 0, directories: 0 },
  );
