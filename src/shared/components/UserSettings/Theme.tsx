import { useTranslation } from 'react-i18next';
import { Label } from '@/core/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { ThemeEnum } from '@/shared/data/settings';
import { useTheme } from '@/shared/hooks/useTheme';

export const Theme: React.FC = () => {
  const { t } = useTranslation('settings');
  const { setTheme, theme } = useTheme();

  const handleChangeTheme = (val: string) => setTheme(val as ThemeEnum);

  return (
    <div className="flex flex-col gap-2">
      <Label>{t('theme.theme')}</Label>
      <Tabs onValueChange={handleChangeTheme} value={theme}>
        <TabsList>
          <TabsTrigger value={ThemeEnum.Dark}>{t('theme.dark')}</TabsTrigger>
          <TabsTrigger value={ThemeEnum.Light}>{t('theme.light')}</TabsTrigger>
          <TabsTrigger value={ThemeEnum.System}>{t('theme.system')}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
