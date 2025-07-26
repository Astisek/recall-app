import { userSettingsStore } from '../store/userSettings.store';
import { ElectronEventEnum } from '../data/events';
import { BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { readDirectory } from '../utils/readDirectory';
import { IFileTreeNode } from '../models/fileTree';
import fs from 'fs/promises';
import path from 'path';
import { notifications } from '../main';

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
      notifications.showError(e);
    }
  });

  ipcMain.handle(ElectronEventEnum.SetDirectory, (_, path: string) => {
    userSettingsStore.setDirectoryPath(path);
  });

  ipcMain.handle(ElectronEventEnum.RemoveItem, async (_, tree: IFileTreeNode) => {
    try {
      await fs.rm(tree.path, { force: true, recursive: true });
    } catch (e) {
      notifications.showError(e);
    }
  });

  ipcMain.handle(
    ElectronEventEnum.EditItemName,
    async (_, tree: IFileTreeNode, newName: string) => {
      try {
        await fs.rename(tree.path, path.join(path.dirname(tree.path), newName));
      } catch (e) {
        notifications.showError(e);
      }
    },
  );

  ipcMain.handle(ElectronEventEnum.OpenDirectory, async (_, path: string) => {
    shell.openPath(path);
  });

  ipcMain.handle(ElectronEventEnum.CreateDirectory, async (_, parentPath: string, name: string) => {
    try {
      await fs.mkdir(path.join(parentPath, name));
    } catch (e) {
      notifications.showError(e);
    }
  });
};
