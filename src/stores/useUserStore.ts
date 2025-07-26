import { create } from 'zustand';

interface IUserSettingsStore {
  directoryPath: string;
  cookie: string;
  setDirectoryPath: (folderPath: string) => void;
  setCookie: (folderPath: string) => void;
  settingsIsCorrect: () => boolean;
}

export const useUserSettingsStore = create<IUserSettingsStore>((set, get) => ({
  directoryPath: '',
  cookie: '',

  setCookie: (cookie: string) => set({ cookie }),
  setDirectoryPath: (directoryPath) =>
    set({
      directoryPath,
    }),

  settingsIsCorrect: () => !!get().directoryPath,
}));
