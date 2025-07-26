import { store } from './';

export const userSettingsStore = {
  getDirectoryPath: () => store.get('userSettings:directoryPath') ?? '',
  setDirectoryPath: (path: string) => {
    store.set('userSettings:directoryPath', path);
  },

  getYoutubeCookie: () => store.get('userSettings:cookie') || '',
  setYoutubeCookie: (cookie: string) => store.set('userSettings:cookie', cookie),
};
