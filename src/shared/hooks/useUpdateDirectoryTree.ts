import { ElectronEventEnum } from '@/electron/data/events';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { useNotification } from '@/shared/hooks/useNotification';
import { NotificationVariantEnum } from '@/shared/models/notification';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useUpdateDirectoryTree = () => {
  const { directoryPath } = useUserSettingsStore();
  const { setTree } = useFileTreeStore();
  const { removeNotification, showNotification } = useNotification();
  const { t } = useTranslation('notification');

  const updateDirectory = useCallback(
    async (path?: string) => {
      const notificationId = showNotification({
        title: t('directory.syncing'),
        variant: NotificationVariantEnum.Endless,
      });
      const filesTree: IFileTreeNode[] = await window.ipcRenderer.invoke(
        ElectronEventEnum.ParseDirectoryTree,
        path ?? directoryPath,
      );

      setTree(filesTree);

      removeNotification(notificationId);
    },
    [directoryPath, removeNotification, setTree, showNotification, t],
  );

  return updateDirectory;
};
