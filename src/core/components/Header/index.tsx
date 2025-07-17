import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { HeaderTabsEnum } from '@/core/data/headerTabs';
import { useTranslation } from 'react-i18next';

import LogoIcon from '@/assets/icons/logo.svg?react';
import { UserSettings } from '@/shared/components/UserSettings';
import { DownloadPad } from '@/core/components/DownloadPad';

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
          {/* TODO: Add user profile */}
          {/* <p>Astisek</p> */}
          <UserSettings />
        </div>
        <LogoIcon width={36} className="absolute left-1/2 -translate-x-1/2" />
      </div>
      <TabsContent value={HeaderTabsEnum.URL}>
        <DownloadPad />
      </TabsContent>
    </Tabs>
  );
};
