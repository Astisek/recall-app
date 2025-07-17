import { Label } from '@/core/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { ThemeEnum } from '@/shared/data/settings';
import { useTranslation } from 'react-i18next';

export const Theme: React.FC = () => {
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-2">
      <Label>{t('theme.theme')}</Label>
      <Tabs defaultValue={ThemeEnum.Dark}>
        <TabsList>
          <TabsTrigger value={ThemeEnum.Dark}>{t('theme.dark')}</TabsTrigger>
          <TabsTrigger value={ThemeEnum.Light} disabled>
            {t('theme.light')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
