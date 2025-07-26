import s from './styles.module.css';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { ElectronEventEnum } from '@/electron/data/events';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { RemoveItem } from '@/modules/HomePage/components/ItemCard/RemoveItem';
import { EditItem } from '@/modules/HomePage/components/ItemCard/EditItem';
import { useNotification } from '@/shared/hooks/useNotification';
import { useTranslation } from 'react-i18next';
import { NotificationCategoryEnum } from '@/shared/models/notification';

interface CardActionsProps {
  fileNode: IFileTreeNode;
}

export const CardActions: React.FC<CardActionsProps> = ({ fileNode }) => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { showNotification } = useNotification();
  const { t } = useTranslation('notification');

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const handleDelete = async () => {
    await window.ipcRenderer.invoke(ElectronEventEnum.RemoveItem, fileNode);
    await updateDirectoryTree();

    showNotification({
      title: fileNode.isDirectory ? t('directory.directoryDeleted') : t('directory.fileDeleted'),
      category: NotificationCategoryEnum.Success,
    });
  };

  const handleEdit = async (name: string) => {
    await window.ipcRenderer.invoke(ElectronEventEnum.EditItemName, fileNode, name);
    await updateDirectoryTree();

    showNotification({
      title: fileNode.isDirectory ? t('directory.directoryChanged') : t('directory.fileChanged'),
      category: NotificationCategoryEnum.Success,
    });
  };

  return (
    <div className={s.actions} onClick={stopPropagation}>
      <EditItem onEdit={handleEdit} defaultValue={fileNode.name} />
      <RemoveItem onDelete={handleDelete} />
    </div>
  );
};
