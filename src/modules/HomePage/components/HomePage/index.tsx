import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { FileList } from '@/modules/HomePage/components/FileList';
import { FileListHeader } from '@/modules/HomePage/components/FileListHeader';
import { Header } from '@/modules/HomePage/components/Header';
import { parseFilesUrl } from '@/modules/HomePage/utils/parseFilesUrl';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useUserSettingsStore } from '@/stores/useUserStore';

export const HomePage: React.FC = () => {
  const { tree } = useFileTreeStore();
  const location = useLocation();
  const { t } = useTranslation('mainPage');
  const { settingsIsCorrect } = useUserSettingsStore();

  const pathnameDirectories = useMemo(() => parseFilesUrl(location.pathname), [location.pathname]);

  const currentTree = useMemo(
    () =>
      (
        structuredClone(pathnameDirectories).reduce<IFileTreeNode[] | undefined>(
          (acc, item) => acc?.find(({ name }) => name === item)?.children,
          tree,
        ) ?? []
      ).sort((prev, next) => {
        if (prev.isDirectory !== next.isDirectory) {
          return prev.isDirectory ? -1 : 1;
        }
        return next.name.lastIndexOf(prev.name);
      }),
    [pathnameDirectories, tree],
  );

  return (
    <div className="px-10 py-5 flex flex-col gap-5 h-dvh">
      <Header />

      <FileListHeader pathnameDirectories={pathnameDirectories} />
      <AnimatePresence mode="wait">
        <Fragment key={currentTree.length ? location.pathname : 'empty'}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex-1 h-1"
          >
            {currentTree.length ? (
              <ScrollArea className="h-full">
                <FileList list={currentTree} />
              </ScrollArea>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground text-lg">
                  {t(settingsIsCorrect() ? 'list.placeholder' : 'list.selectDirectory')}
                </p>
              </div>
            )}
          </motion.div>
        </Fragment>
      </AnimatePresence>
      <div className="h-2"></div>
    </div>
  );
};
