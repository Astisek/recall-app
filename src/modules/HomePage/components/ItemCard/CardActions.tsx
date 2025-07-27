import { useTranslation } from 'react-i18next';
import s from './styles.module.css';
import { ElectronEventEnum } from '@/electron/data/events';
import { IFileTreeNode } from '@/electron/models/fileTree';
import { EditItem } from '@/modules/HomePage/components/ItemCard/EditItem';
import { RemoveItem } from '@/modules/HomePage/components/ItemCard/RemoveItem';
import { useNotification } from '@/shared/hooks/useNotification';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { NotificationCategoryEnum } from '@/shared/models/notification';

interface CardActionsProps {
  fileNode: IFileTreeNode;
}

export const CardActions: React.FC<CardActionsProps> = ({ fileNode }) => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { showNotification, showErrorNotification } = useNotification();
  const { t } = useTranslation('notification');

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const handleDelete = async () => {
    try {
      await window.ipcRenderer.invoke(ElectronEventEnum.RemoveItem, fileNode);
      await updateDirectoryTree();

      showNotification({
        title: fileNode.isDirectory ? t('directory.directoryDeleted') : t('directory.fileDeleted'),
        category: NotificationCategoryEnum.Success,
      });
    } catch (e) {
      showErrorNotification(e);
    }
  };

  const handleEdit = async (name: string) => {
    try {
      await window.ipcRenderer.invoke(ElectronEventEnum.EditItemName, fileNode, name);
      await updateDirectoryTree();

      showNotification({
        title: fileNode.isDirectory ? t('directory.directoryChanged') : t('directory.fileChanged'),
        category: NotificationCategoryEnum.Success,
      });
    } catch (e) {
      showErrorNotification(e);
    }
  };

  return (
    <div className={s.actions} onClick={stopPropagation}>
      <EditItem onEdit={handleEdit} defaultValue={fileNode.name} />
      <RemoveItem onDelete={handleDelete} />
    </div>
  );
};
