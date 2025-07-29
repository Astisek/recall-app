import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ElectronEventEnum } from '@/electron/data/events';
import { IElectronClientStore } from '@/electron/models/store';
import { useNotification } from '@/shared/hooks/useNotification';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { NotificationCategoryEnum } from '@/shared/models/notification';
import { useUserSettingsStore } from '@/stores/useUserStore';

export const LoadStores = () => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { setDirectoryPath, setCookie, setRootDirectoryName } = useUserSettingsStore();
  const { showNotification, showErrorNotification } = useNotification();
  const { t } = useTranslation('notification');

  useEffect(() => {
    (async () => {
      try {
        const {
          userSettings: { directoryPath, cookie, rootDirectoryPath },
        } = (await window.ipcRenderer.invoke(ElectronEventEnum.GetStores)) as IElectronClientStore;

        if (!directoryPath) {
          return showNotification({
            title: t('directory.selectFolderTitle'),
            description: t('directory.selectFolderDesc'),
            category: NotificationCategoryEnum.Info,
          });
        }

        setRootDirectoryName(rootDirectoryPath);
        setDirectoryPath(directoryPath);
        setCookie(cookie);

        await updateDirectoryTree(directoryPath);
      } catch (e) {
        showErrorNotification(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
