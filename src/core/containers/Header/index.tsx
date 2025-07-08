import { Button } from '@/core/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { HeaderTabsEnum } from '@/core/data/headerTabs';
import { useTranslation } from 'react-i18next';
import PasteIcon from '@/assets/icons/paste.svg?react';

import LogoIcon from '@/assets/icons/logo.svg?react';
import { Input } from '@/core/components/ui/input';
import { UserSettings } from '@/shared/containers/UserSettings';

export const Header: React.FC = () => {
  const { t } = useTranslation('shared');

  return (
    <Tabs defaultValue={HeaderTabsEnum.URL} className="gap-4 relative">
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value={HeaderTabsEnum.URL}>{t('header.url')}</TabsTrigger>
          <TabsTrigger value={HeaderTabsEnum.Search} disabled>
            {t('header.search')}
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-5">
          <p>Astisek</p>
          <UserSettings />
        </div>
        <LogoIcon width={36} className="absolute left-1/2 -translate-x-1/2" />
      </div>
      <TabsContent value={HeaderTabsEnum.URL}>
        <div className="flex justify-between gap-2">
          <Input className="flex-auto" placeholder={t('header.searchInputPlaceholder')} />
          <Button>
            <PasteIcon />
          </Button>
          <Button>{t('header.add')}</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
