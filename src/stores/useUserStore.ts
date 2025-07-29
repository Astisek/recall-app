import { create } from 'zustand';

interface IUserSettingsStore {
  directoryPath: string;
  cookie: string;
  rootDirectoryName: string;
  setDirectoryPath: (folderPath: string) => void;
  setCookie: (folderPath: string) => void;
  settingsIsCorrect: () => boolean;
  setRootDirectoryName: (name: string) => void;
}

export const useUserSettingsStore = create<IUserSettingsStore>((set, get) => ({
  directoryPath: '',
  cookie: '',
  rootDirectoryName: '',

  setCookie: (cookie) => set({ cookie }),
  setDirectoryPath: (directoryPath) =>
    set({
      directoryPath,
    }),

  settingsIsCorrect: () => !!get().directoryPath,
  setRootDirectoryName: (rootDirectoryName) => set({ rootDirectoryName }),
}));
