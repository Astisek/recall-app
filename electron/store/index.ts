import { IElectronClientStore, IElectronStore } from '../models/store';
import Store from 'electron-store';
import { ipcMain } from 'electron';
import { ElectronEventEnum } from '../data/events';
import { userSettingsStore } from './userSettings.store';

export const store = new Store<IElectronStore>({
  encryptionKey: import.meta.env.MAIN_VITE_STORE_KEY,
});

export const init = () => {
  ipcMain.handle(
    ElectronEventEnum.GetStores,
    (): IElectronClientStore => ({
      userSettings: {
        directoryPath: userSettingsStore.getDirectoryPath(),
        cookie: userSettingsStore.getYoutubeCookie(),
      },
    }),
  );
};
