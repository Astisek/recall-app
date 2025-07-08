import { enMainPage } from '@/content/en/mainPage';
import { enSettings } from '@/content/en/settings';
import { enShared } from '@/content/en/shared';

export const resources = {
  en: {
    shared: enShared,
    mainPage: enMainPage,
    settings: enSettings,
  },
} as const;
