import { useTranslation } from 'react-i18next';
import { Label } from '@/core/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { LanguageEnum } from '@/shared/data/settings';
import { useNotification } from '@/shared/hooks/useNotification';

export const Language: React.FC = () => {
  const { t: settingsT, i18n } = useTranslation('settings');
  const { t: notificationT } = useTranslation('notification');
  const { showNotification } = useNotification();

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    showNotification({ title: notificationT('settings.langChanged') });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{settingsT('language.language')}</Label>
      <Tabs onValueChange={handleChangeLang} value={i18n.language}>
        <TabsList>
          <TabsTrigger value={LanguageEnum.En}>{settingsT('language.en')}</TabsTrigger>
          <TabsTrigger value={LanguageEnum.Ru}>{settingsT('language.ru')}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
