import { create } from 'zustand';

interface IUserSettingsStore {
  folderPath: string;
  updateFolderPath: (folderPath: string) => void;
}

export const useUserSettingsStore = create<IUserSettingsStore>((set) => ({
  folderPath: '',
  updateFolderPath: (folderPath) =>
    set({
      folderPath,
    }),
}));
