import { ElectronEventEnum } from '@/electron/data/events';
import { IElectronClientStore } from '@/electron/models/store';
import { useNotification } from '@/shared/hooks/useNotification';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { NotificationCategoryEnum } from '@/shared/models/notification';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LoadStores = () => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { setDirectoryPath, setCookie } = useUserSettingsStore();
  const { showNotification } = useNotification();
  const { t } = useTranslation('notification');

  useEffect(() => {
    (async () => {
      const {
        userSettings: { directoryPath, cookie },
      } = (await window.ipcRenderer.invoke(ElectronEventEnum.GetStores)) as IElectronClientStore;

      if (!directoryPath) {
        return showNotification({
          title: t('directory.selectFolderTitle'),
          description: t('directory.selectFolderDesc'),
          category: NotificationCategoryEnum.Info,
        });
      }

      setDirectoryPath(directoryPath);
      setCookie(cookie);

      await updateDirectoryTree(directoryPath);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
