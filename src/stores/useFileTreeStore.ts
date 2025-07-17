import { IFileTreeNode } from '@/electron/models/fileTree';
import { filterOnlyDirectories } from '@/shared/utils/filterOnlyDirectories';
import { create } from 'zustand';

interface IFileTreeStore {
  tree: IFileTreeNode[];
  setTree: (tree: IFileTreeNode[]) => void;
  getOnlyDirectories: () => IFileTreeNode[];
}

export const useFileTreeStore = create<IFileTreeStore>((set, get) => ({
  tree: [],
  setTree: (tree) => set({ tree }),
  getOnlyDirectories: () =>
    get()
      .tree.filter(({ isDirectory }) => isDirectory)
      .map(filterOnlyDirectories),
}));
