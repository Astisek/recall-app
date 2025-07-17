import { Label } from '@/core/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { LanguageEnum } from '@/shared/data/settings';
import { useTranslation } from 'react-i18next';

export const Language: React.FC = () => {
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-2">
      <Label>{t('language.language')}</Label>
      <Tabs defaultValue={LanguageEnum.En}>
        <TabsList>
          <TabsTrigger value={LanguageEnum.En}>{t('language.en')}</TabsTrigger>
          <TabsTrigger value={LanguageEnum.Ru}>{t('language.ru')}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
