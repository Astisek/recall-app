import { ElectronEventEnum } from '@/electron/data/events';
import { IElectronClientStore } from '@/electron/models/store';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useEffect } from 'react';

export const LoadStores = () => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { updateDirectoryPath } = useUserSettingsStore();

  useEffect(() => {
    (async () => {
      const {
        userSettings: { directoryPath },
      } = (await window.ipcRenderer.invoke(ElectronEventEnum.GetStores)) as IElectronClientStore;

      updateDirectoryPath(directoryPath);

      await updateDirectoryTree(directoryPath);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
