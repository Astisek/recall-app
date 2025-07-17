import { Button } from '@/core/components/ui/button';
import { useMediaSelectStore } from '@/stores/useMediaSelectStore';
import { useTranslation } from 'react-i18next';

export const DirectoryNodeFooter: React.FC = () => {
  const { t } = useTranslation('shared');
  const { selectedTree } = useMediaSelectStore();

  return (
    <div className="self-end flex gap-4 items-center">
      {!!selectedTree && (
        <p>
          {t('selectMedia.selectedDirectory', { title: selectedTree.name })}{' '}
          <span className="font-semibold">{selectedTree.name}</span>
        </p>
      )}
      <Button>{t('selectMedia.addMedia')}</Button>
    </div>
  );
};
