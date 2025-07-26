import { Button } from '@/core/components/ui/button';
import { Skeleton } from '@/core/components/ui/skeleton';
import { useMediaSelectStore } from '@/stores/useMediaSelectStore';
import { useTranslation } from 'react-i18next';

interface DirectoryNodeFooterProps {
  isLoading: boolean;
  onAdd: () => void;
  isDownloading: boolean;
}

export const DirectoryNodeFooter: React.FC<DirectoryNodeFooterProps> = ({
  isLoading,
  onAdd,
  isDownloading,
}) => {
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
      {isLoading ? (
        <Skeleton className="w-[100px] h-8 rounded" />
      ) : (
        <Button onClick={onAdd} disabled={!selectedTree} loading={isDownloading}>
          {t('selectMedia.addMedia')}
        </Button>
      )}
    </div>
  );
};
