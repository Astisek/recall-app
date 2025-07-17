import { userSettingsStore } from '../store/userSettings.store';
import { ElectronEventEnum } from '../data/events';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import { readDirectory } from '../utils/readDirectory';
import { IFileTreeNode } from '../models/fileTree';
import fs from 'fs/promises';

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
      if (e instanceof Error) {
        throw new Error(`Error: ${e.message}`);
      }
    }
  });

  ipcMain.handle(ElectronEventEnum.GetDirectory, () => userSettingsStore.getDirectoryPath());

  ipcMain.handle(ElectronEventEnum.SetDirectory, (_, path: string) => {
    userSettingsStore.setDirectoryPath(path);
  });

  ipcMain.handle(ElectronEventEnum.SetDirectoryTree, (_, tree: IFileTreeNode[]) => {
    userSettingsStore.setDirectoryTree(tree);
  });

  ipcMain.handle(ElectronEventEnum.RemoveItem, async (_, tree: IFileTreeNode) => {
    try {
      await fs.rm(tree.path, { force: true, recursive: true });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error: ${e.message}`);
      }
    }
  });
};
