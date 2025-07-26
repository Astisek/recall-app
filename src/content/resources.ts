import { enMainPage } from '@/content/en/mainPage';
import { enNotification } from '@/content/en/notification';
import { enSettings } from '@/content/en/settings';
import { enShared } from '@/content/en/shared';

export const resources = {
  en: {
    shared: enShared,
    mainPage: enMainPage,
    settings: enSettings,
    notification: enNotification,
  },
} as const;
