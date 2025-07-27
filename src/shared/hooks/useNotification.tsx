import { last } from 'lodash';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { NotificationLoader } from '@/shared/components/NotificationLoader';
import {
  INotification,
  NotificationCategoryEnum,
  NotificationVariantEnum,
} from '@/shared/models/notification';

export const useNotification = () => {
  const { t } = useTranslation('notification');

  const showNotification = useCallback(
    ({
      title,
      description,
      category = NotificationCategoryEnum.Info,
      variant = NotificationVariantEnum.Simple,
    }: INotification) => {
      let duration = 3000;
      let icon: React.JSX.Element | undefined = undefined;

      switch (variant) {
        case NotificationVariantEnum.Endless:
          duration = Infinity;
          icon = <NotificationLoader />;
          break;
        case NotificationVariantEnum.Simple:
        default:
          break;
      }

      return toast[category](title, {
        description,
        duration,
        icon,
      });
    },
    [],
  );

  const showErrorNotification = useCallback(
    (error: unknown) =>
      error instanceof Error &&
      showNotification({
        title: t('electron.error'),
        description: last(error.message.split("':")),
        category: NotificationCategoryEnum.Error,
      }),
    [showNotification, t],
  );

  const removeNotification = useCallback((id: string | number) => toast.dismiss(id), []);

  return { showNotification, removeNotification, showErrorNotification };
};
