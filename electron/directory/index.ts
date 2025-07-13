import { userSettingsStore } from '../store/userSettings.store';
import { ElectronEventEnum } from '../data/events';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import { readDirectory } from '../utils/readDirectory';
import { IFileTreeNode } from '@/electron/models/fileTree';

export const init = () => {
  ipcMain.handle(ElectronEventEnum.SelectDirectory, async () => {
    const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, {
      properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    const selectedDirectory = result.filePaths[0];

    return selectedDirectory;
  });

  ipcMain.handle(ElectronEventEnum.ParseDirectoryTree, async (_, path: string) => {
    try {
      const tree = await readDirectory(path);

      return tree;
    } catch (e) {
      throw new Error('Something wrong!');
    }
  });

  ipcMain.handle(ElectronEventEnum.GetDirectory, () => {
    return userSettingsStore.getDirectoryPath();
  });

  ipcMain.handle(ElectronEventEnum.SetDirectory, (_, path: string) => {
    userSettingsStore.setDirectoryPath(path);
  });
  ipcMain.handle(ElectronEventEnum.SetDirectoryTree, (_, tree: IFileTreeNode[]) => {
    userSettingsStore.setDirectoryTree(tree);
  });
};
