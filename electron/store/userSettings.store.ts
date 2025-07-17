import { IFileTreeNode } from '@/electron/models/fileTree';
import { store } from './';

export const userSettingsStore = {
  getDirectoryPath: () => store.get('userSettings:directoryPath') ?? '',
  setDirectoryPath: (path: string) => {
    store.set('userSettings:directoryPath', path);
  },

  setDirectoryTree: (tree: IFileTreeNode[]) => {
    store.set('userSettings:directoryTree', tree);
  },
  getDirectoryTree: () => store.get('userSettings:directoryTree') ?? [],
};
