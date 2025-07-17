import { ElectronEventEnum } from '@/electron/data/events';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useCallback } from 'react';

export const useUpdateDirectoryTree = () => {
  const { directoryPath } = useUserSettingsStore();
  const { setTree } = useFileTreeStore();

  const updateDirectory = useCallback(
    async (path?: string) => {
      try {
        const filesTree: IFileTreeNode[] = await window.ipcRenderer.invoke(
          ElectronEventEnum.ParseDirectoryTree,
          path ?? directoryPath,
        );

        setTree(filesTree);

        await window.ipcRenderer.invoke(ElectronEventEnum.SetDirectoryTree, filesTree);
      } catch (e) {
        // TODO: Add notification
      }
    },
    [directoryPath, setTree],
  );

  return updateDirectory;
};
