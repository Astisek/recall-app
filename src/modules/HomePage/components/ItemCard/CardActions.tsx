import { Button } from '@/core/components/ui/button';
import s from './styles.module.css';
import { Trash } from 'lucide-react';
import { IFileTreeNode } from '@/electron/models/fileTree';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/ui/alert-dialog';
import { useTranslation } from 'react-i18next';
import { useReducer, useState } from 'react';
import { ElectronEventEnum } from '@/electron/data/events';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';

interface CardActionsProps {
  fileNode: IFileTreeNode;
}

export const CardActions: React.FC<CardActionsProps> = ({ fileNode }) => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { t } = useTranslation('mainPage');
  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      await window.ipcRenderer.invoke(ElectronEventEnum.RemoveItem, fileNode);
      await updateDirectoryTree();
    } catch (error) {
      // TODO: Add notification
    } finally {
      toggleIsOpen();
      setIsDeleteLoading(false);
    }
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className={s.actions}>
      <AlertDialog open={isOpen} onOpenChange={toggleIsOpen}>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" onClick={stopPropagation}>
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent onClick={stopPropagation}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('alerts.removeItemTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('alerts.removeItemDesc')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('alerts.removeCancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleteLoading}>
              {t('alerts.removeAccept')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
