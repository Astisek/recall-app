import { IFileTreeNode } from '@/electron/models/fileTree';
import { create } from 'zustand';

interface IFileTreeStore {
  tree: IFileTreeNode[];
  setTree: (tree: IFileTreeNode[]) => void;
}

export const useFileTreeStore = create<IFileTreeStore>((set) => ({
  tree: [],
  setTree: (tree) => set({ tree }),
}));
