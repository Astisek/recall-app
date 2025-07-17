import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { useTranslation } from 'react-i18next';
import PasteIcon from '@/assets/icons/paste.svg?react';
import { useReducer } from 'react';
import { MediaSelectModal } from '@/core/components/MediaSelectModal';

export const DownloadPad = () => {
  const { t } = useTranslation('shared');
  const [isOpenMediaDrawer, toggleIsOpenMediaDrawer] = useReducer((state) => !state, false);

  return (
    <div className="flex justify-between gap-2">
      <Input className="flex-auto" placeholder={t('header.searchInputPlaceholder')} />
      <Button>
        <PasteIcon />
      </Button>
      <Button onClick={toggleIsOpenMediaDrawer}>{t('header.add')}</Button>

      {isOpenMediaDrawer && <MediaSelectModal onClose={toggleIsOpenMediaDrawer} url="asd" />}
    </div>
  );
};
