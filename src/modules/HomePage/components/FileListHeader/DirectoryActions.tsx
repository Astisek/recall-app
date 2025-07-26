import { Button } from '@/core/components/ui/button';
import { ElectronEventEnum } from '@/electron/data/events';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { TextEditModal } from '@/modules/HomePage/components/TextEditModal';
import { useNotification } from '@/shared/hooks/useNotification';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { NotificationCategoryEnum } from '@/shared/models/notification';
import { useFileTreeStore } from '@/stores/useFileTreeStore';
import { useUserSettingsStore } from '@/stores/useUserStore';
import { Plus } from 'lucide-react';
import { useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

interface FileListHeaderProps {
  pathnameDirectories: string[];
}

export const DirectoryActions: React.FC<FileListHeaderProps> = ({ pathnameDirectories }) => {
  const { tree } = useFileTreeStore();
  const { directoryPath, settingsIsCorrect } = useUserSettingsStore();
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { t: mainPageT } = useTranslation('mainPage');
  const { t: notificationT } = useTranslation('notification');
  const { showNotification } = useNotification();

  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);

  const handleCreate = async (name: string) => {
    await window.ipcRenderer.invoke(ElectronEventEnum.CreateDirectory, currentNode?.path, name);
    await updateDirectoryTree();
    showNotification({
      title: notificationT('directory.directoryCreated'),
      category: NotificationCategoryEnum.Success,
    });
  };

  const currentNode = useMemo(
    () =>
      pathnameDirectories.reduce<IFileTreeNode | undefined>(
        (acc, path) => acc?.children?.find(({ name }) => name === path),
        { children: tree, name: 'root', path: directoryPath, isDirectory: true },
      ),
    [directoryPath, pathnameDirectories, tree],
  );

  return (
    <>
      <Button onClick={toggleIsOpen} disabled={!settingsIsCorrect()}>
        <Plus />
      </Button>
      <TextEditModal
        isOpen={isOpen}
        onClose={toggleIsOpen}
        onEdit={handleCreate}
        accept={mainPageT('modals.createDirectoryAccept')}
        cancel={mainPageT('modals.createDirectoryCancel')}
        desc={mainPageT('modals.createDirectoryDesc')}
        placeholder={mainPageT('modals.createDirectoryPlaceholder')}
        title={mainPageT('modals.createDirectoryTitle')}
      />
    </>
  );
};
