import { create } from 'zustand';

interface IUserSettingsStore {
  directoryPath: string;
  updateDirectoryPath: (folderPath: string) => void;
}

export const useUserSettingsStore = create<IUserSettingsStore>((set) => ({
  directoryPath: '',
  updateDirectoryPath: (directoryPath) =>
    set({
      directoryPath,
    }),
}));
