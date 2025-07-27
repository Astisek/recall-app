import { ipcMain } from 'electron';
import Store from 'electron-store';
import { userSettingsStore } from './userSettings.store';
import { ElectronEventEnum } from '../data/events';
import { IElectronClientStore, IElectronStore } from '../models/store';

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
