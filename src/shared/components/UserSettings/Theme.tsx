import { useTranslation } from 'react-i18next';
import { Label } from '@/core/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { ThemeEnum } from '@/shared/data/settings';
import { useNotification } from '@/shared/hooks/useNotification';
import { useTheme } from '@/shared/hooks/useTheme';

export const Theme: React.FC = () => {
  const { t: settingsT } = useTranslation('settings');
  const { t: notificationT } = useTranslation('notification');
  const { showNotification } = useNotification();
  const { setTheme, theme } = useTheme();

  const handleChangeTheme = (val: string) => {
    setTheme(val as ThemeEnum);
    showNotification({ title: notificationT('settings.themeChanged') });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{settingsT('theme.theme')}</Label>
      <Tabs onValueChange={handleChangeTheme} value={theme}>
        <TabsList>
          <TabsTrigger value={ThemeEnum.Dark}>{settingsT('theme.dark')}</TabsTrigger>
          <TabsTrigger value={ThemeEnum.Light}>{settingsT('theme.light')}</TabsTrigger>
          <TabsTrigger value={ThemeEnum.System}>{settingsT('theme.system')}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
