import { userSettingsStore } from '../store/userSettings.store';
import { EventEnum } from '../data/events';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import { readDirectory } from '../utils/readDirectory';

export const init = () => {
  ipcMain.handle(EventEnum.SelectDirectory, async () => {
    const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, {
      properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    const selectedDirectory = result.filePaths[0];

    userSettingsStore.setFolderPath(selectedDirectory);

    return {
      directory: selectedDirectory,
      tree: await readDirectory(selectedDirectory),
    };
  });

  ipcMain.handle(EventEnum.GetDirectory, () => {
    return userSettingsStore.getFolderPath();
  });
};
