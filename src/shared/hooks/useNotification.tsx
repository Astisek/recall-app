import {
  INotification,
  NotificationCategoryEnum,
  NotificationVariantEnum,
} from '@/shared/models/notification';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { NotificationLoader } from '@/shared/components/NotificationLoader';

export const useNotification = () => {
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

  const removeNotification = useCallback((id: string | number) => toast.dismiss(id), []);

  return { showNotification, removeNotification };
};
