import { createContext } from 'react';
import { ThemeEnum } from '@/shared/data/settings';
import { ThemeProviderState } from '@/shared/models/theme';

const initialState: ThemeProviderState = {
  theme: ThemeEnum.System,
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
