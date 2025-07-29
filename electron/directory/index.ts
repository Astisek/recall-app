import fs from 'fs/promises';
import path, { basename } from 'path';
import { BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { ElectronEventEnum } from '../data/events';
import { notifications } from '../main';
import { IFileTreeNode } from '../models/fileTree';
import { userSettingsStore } from '../store/userSettings.store';
import { readDirectory } from '../utils/readDirectory';

export const init = () => {
  ipcMain.handle(ElectronEventEnum.SelectDirectory, async () => {
    const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, {
      properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return [null, null];
    }

    const selectedDirectory = result.filePaths[0];

    return [selectedDirectory, basename(selectedDirectory)];
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
    userSettingsStore.setRootDirectoryPath(basename(path));
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
