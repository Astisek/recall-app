import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { useTranslation } from 'react-i18next';
import PasteIcon from '@/assets/icons/paste.svg?react';
import { useState } from 'react';
import { MediaSelectModal } from '@/modules/HomePage/components/MediaSelectModal';
import { detectMediaUrl } from '@/modules/HomePage/utils/detectMediaUrl';
import { IUrlData } from '@/modules/HomePage/models';
import { useNotification } from '@/shared/hooks/useNotification';
import { NotificationCategoryEnum } from '@/shared/models/notification';
import { useUserSettingsStore } from '@/stores/useUserStore';

export const DownloadPad = () => {
  const { t: sharedT } = useTranslation('shared');
  const { t: notificationT } = useTranslation('notification');
  const { showNotification } = useNotification();
  const { settingsIsCorrect } = useUserSettingsStore();

  const [urlData, setUrlData] = useState<IUrlData>();
  const [url, setUrl] = useState('');

  const handleAddUrl = () => proceedUrl(url);
  const handleCloseModal = () => setUrlData(undefined);

  const proceedUrl = (sourceUrl: string) => {
    const mediaData = detectMediaUrl(sourceUrl);
    if (!mediaData) {
      showNotification({
        title: notificationT('mainPage.incorrectLinkTitle'),
        description: notificationT('mainPage.incorrectLinkDesc'),
        category: NotificationCategoryEnum.Error,
      });
      return;
    }

    setUrlData(mediaData);
  };

  const handlePaste = async () => {
    try {
      proceedUrl(await navigator.clipboard.readText());
    } catch (_) {
      showNotification({
        title: notificationT('mainPage.clipboardErrorTitle'),
        description: notificationT('mainPage.clipboardErrorDesc'),
        category: NotificationCategoryEnum.Error,
      });
    }
  };

  return (
    <div className="flex justify-between gap-2">
      <Input
        className="flex-auto"
        placeholder={sharedT('header.searchInputPlaceholder')}
        value={url}
        onChange={setUrl}
      />
      <Button onClick={handlePaste} disabled={!settingsIsCorrect()}>
        <PasteIcon />
      </Button>
      <Button onClick={handleAddUrl} disabled={!url || !settingsIsCorrect()}>
        {sharedT('header.add')}
      </Button>

      {!!urlData && <MediaSelectModal onClose={handleCloseModal} urlData={urlData} />}
    </div>
  );
};
