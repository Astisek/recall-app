import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ElectronEventEnum, ElectronNotificationEnum } from '@/electron/data/events';
import { useNotification } from '@/shared/hooks/useNotification';
import { NotificationCategoryEnum, NotificationVariantEnum } from '@/shared/models/notification';

export const NotificationControl: React.FC = () => {
  const { showNotification, removeNotification } = useNotification();
  const { t } = useTranslation('notification');
  const eventsRef = useRef<Map<ElectronNotificationEnum, string | number>>(new Map());

  const showElectronNotification = useCallback(
    (_: unknown, key: ElectronNotificationEnum, data: string) => {
      if (eventsRef.current.get(key)) return;

      switch (key) {
        case ElectronNotificationEnum.MediaProcessing:
          eventsRef.current.set(
            ElectronNotificationEnum.MediaProcessing,
            showNotification({
              title: t('electron.mediaProcessing'),
              variant: NotificationVariantEnum.Endless,
            }),
          );
          break;
        case ElectronNotificationEnum.MediaDownloading:
          eventsRef.current.set(
            ElectronNotificationEnum.MediaDownloading,
            showNotification({
              title: t('electron.mediaDownloading'),
              variant: NotificationVariantEnum.Endless,
            }),
          );
          break;
        case ElectronNotificationEnum.Error:
          showNotification({
            title: t('electron.error'),
            category: NotificationCategoryEnum.Error,
            description: data,
          });
          break;
        case ElectronNotificationEnum.DownloadComplete:
          showNotification({
            title: t('mainPage.downloadComplete'),
            category: NotificationCategoryEnum.Success,
          });
          break;
        case ElectronNotificationEnum.AppUpdated:
          showNotification({
            title: t('electron.updated', { ver: data }),
            category: NotificationCategoryEnum.Success,
          });
          break;
        case ElectronNotificationEnum.RemoveNotification:
          const event = data as ElectronNotificationEnum;
          const id = eventsRef.current.get(event);
          if (!data) return;
          if (!id) return;
          removeNotification(id);
          eventsRef.current.delete(event);
          break;
      }
    },
    [removeNotification, showNotification, t],
  );

  useEffect(() => {
    window.ipcRenderer.on(ElectronEventEnum.SendNotification, showElectronNotification);

    return () => {
      window.ipcRenderer.off(ElectronEventEnum.SendNotification, showElectronNotification);
    };
  }, [showElectronNotification]);

  return <></>;
};
