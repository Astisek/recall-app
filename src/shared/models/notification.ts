import { ExternalToast } from 'sonner';

export enum NotificationCategoryEnum {
  Info = 'info',
  Success = 'success',
  Error = 'error',
}

export enum NotificationVariantEnum {
  Simple = 1,
  Endless = 2,
}

export interface INotification extends Partial<ExternalToast> {
  title: string;
  category?: NotificationCategoryEnum;
  description?: string;
  variant?: NotificationVariantEnum;
}
