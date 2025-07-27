import { useTranslation } from 'react-i18next';
import { Label } from '@/core/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { LanguageEnum } from '@/shared/data/settings';

export const Language: React.FC = () => {
  const { t, i18n } = useTranslation('settings');

  console.log(i18n.language);

  const handleChangeLang = (lang: string) => i18n.changeLanguage(lang);

  return (
    <div className="flex flex-col gap-2">
      <Label>{t('language.language')}</Label>
      <Tabs onValueChange={handleChangeLang} value={i18n.language}>
        <TabsList>
          <TabsTrigger value={LanguageEnum.En}>{t('language.en')}</TabsTrigger>
          <TabsTrigger value={LanguageEnum.Ru}>{t('language.ru')}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
