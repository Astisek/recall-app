import { ElectronEventEnum } from '@/electron/data/events';
import { IElectronClientStore } from '@/electron/models/store';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useEffect } from 'react';

export const LoadStores = () => {
  const { setTree } = useFileTreeStore();
  const { updateFolderPath } = useUserSettingsStore();

  useEffect(() => {
    (async () => {
      const {
        userSettings: { directoryPath, directoryTree },
      } = (await window.ipcRenderer.invoke(ElectronEventEnum.GetStores)) as IElectronClientStore;

      setTree(directoryTree);
      updateFolderPath(directoryPath);
    })();
  }, [setTree, updateFolderPath]);

  return null;
};
