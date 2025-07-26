import { IFileTreeNode } from '@/electron/models/fileTree';
import { create } from 'zustand';

interface IMediaSelectStore {
  selectedTree?: IFileTreeNode;
  setSelectedTree: (tree?: IFileTreeNode) => void;
}

export const useMediaSelectStore = create<IMediaSelectStore>((set) => ({
  selectedTree: undefined,
  setSelectedTree: (selectedTree) => set({ selectedTree }),
}));
