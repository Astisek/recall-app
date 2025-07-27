import { createContext } from 'react';
import { ThemeProviderState } from '@/shared/models/theme';

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
