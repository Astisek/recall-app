import { Header } from '@/core/components/Header';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { FileList } from '@/modules/HomePage/components/FileList';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { parseFilesUrl } from '@/modules/HomePage/utils/parseFilesUrl';
import { FileListHeader } from '@/modules/HomePage/components/FileListHeader';

export const HomePage: React.FC = () => {
  const { tree } = useFileTreeStore();
  const location = useLocation();

  const pathnameDirectories = useMemo(() => parseFilesUrl(location.pathname), [location.pathname]);

  const currentTree = useMemo(
    () =>
      (
        pathnameDirectories.reduce<IFileTreeNode[] | undefined>(
          (acc, item) => acc?.find(({ name }) => name === item)?.children,
          tree,
        ) ?? []
      ).sort((prev, next) => next.name.lastIndexOf(prev.name)),
    [pathnameDirectories, tree],
  );

  return (
    <div className="px-10 py-5 flex flex-col gap-5 h-dvh">
      <Header />

      <FileListHeader pathnameDirectories={pathnameDirectories} />

      <ScrollArea className="flex-1 h-1">
        <FileList list={currentTree} />
      </ScrollArea>

      <div className="h-2"></div>
    </div>
  );
};
