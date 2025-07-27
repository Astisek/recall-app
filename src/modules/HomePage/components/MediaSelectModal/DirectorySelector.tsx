import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DrawerHeader, DrawerTitle } from '@/core/components/ui/drawer';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { Skeleton } from '@/core/components/ui/skeleton';
import { DirectoryNode } from '@/modules/HomePage/components/MediaSelectModal/DirectoryNode';
import { useFileTreeStore } from '@/stores/useFileTreeStore';

interface DirectoryViewProps {
  isLoading: boolean;
}

export const DirectorySelector: React.FC<DirectoryViewProps> = ({ isLoading }) => {
  const { t } = useTranslation('shared');

  const { getOnlyDirectories } = useFileTreeStore();

  const tree = useMemo(() => getOnlyDirectories(), [getOnlyDirectories]);

  return (
    <div>
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
            {tree.map((dir) => (
              <DirectoryNode key={dir.path} node={dir} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
