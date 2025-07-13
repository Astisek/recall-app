import { store } from './';

export const userSettingsStore = {
  getFolderPath: () => {
    const path = store.get('userSettingsStore.folderPath');
    if (typeof path === 'string') {
      return path;
    }
    return '';
  },
  setFolderPath: (path: string) => {
    store.set('userSettingsStore.folderPath', path);
  },
};
