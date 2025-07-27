import { useEffect, useMemo, useState } from 'react';
import { ThemeProviderContext } from '@/core/data/themeContext';
import { ThemeEnum } from '@/shared/data/settings';

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeEnum;
  storageKey?: string;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = ThemeEnum.System,
  storageKey = 'theme',
  ...props
}) => {
  const [theme, setTheme] = useState<ThemeEnum>(
    () => (localStorage.getItem(storageKey) as ThemeEnum) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: ThemeEnum) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    }),
    [storageKey, theme],
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
