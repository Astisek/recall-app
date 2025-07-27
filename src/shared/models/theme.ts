import { ThemeEnum } from '@/shared/data/settings';

export type ThemeProviderState = {
  theme: ThemeEnum;
  setTheme: (theme: ThemeEnum) => void;
};
