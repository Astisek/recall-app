import { enMainPage } from '@/content/en/mainPage';
import { enNotification } from '@/content/en/notification';
import { enSettings } from '@/content/en/settings';
import { enShared } from '@/content/en/shared';
import { ruMainPage } from '@/content/ru/mainPage';
import { ruNotification } from '@/content/ru/notification';
import { ruSettings } from '@/content/ru/settings';
import { ruShared } from '@/content/ru/shared';

export const resources = {
  en: {
    shared: enShared,
    mainPage: enMainPage,
    settings: enSettings,
    notification: enNotification,
  },
  ru: {
    shared: ruShared,
    mainPage: ruMainPage,
    settings: ruSettings,
    notification: ruNotification,
  },
} as const;
