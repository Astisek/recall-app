import { DirectoryNode } from '@/core/components/MediaSelectModal/DirectoryNode';
import { DrawerHeader, DrawerTitle } from '@/core/components/ui/drawer';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { Skeleton } from '@/core/components/ui/skeleton';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useTranslation } from 'react-i18next';

interface DirectoryViewProps {
  isLoading: boolean;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ isLoading }) => {
  const { t } = useTranslation('shared');

  const { tree, getOnlyDirectories } = useFileTreeStore();

  const directoryTrees = tree.filter(({ isDirectory }) => isDirectory);

  return (
    <div className="w-1/2">
      <DrawerHeader>
        <DrawerTitle>{t('selectMedia.selectDirectory')}</DrawerTitle>
      </DrawerHeader>

      {isLoading ? (
        <div className="space-y-2 px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded" />
          ))}
        </div>
      ) : (
        <ScrollArea className="px-2 border rounded-sm h-[300px]">
          <div className="space-y-1">
            {getOnlyDirectories().map((dir) => (
              <DirectoryNode key={dir.path} node={dir} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
