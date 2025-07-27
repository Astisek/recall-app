import { create } from 'zustand';
import { IFileTreeNode } from '@/electron/models/fileTree';

interface IMediaSelectStore {
  selectedTree?: IFileTreeNode;
  setSelectedTree: (tree?: IFileTreeNode) => void;
}

export const useMediaSelectStore = create<IMediaSelectStore>((set) => ({
  selectedTree: undefined,
  setSelectedTree: (selectedTree) => set({ selectedTree }),
}));
