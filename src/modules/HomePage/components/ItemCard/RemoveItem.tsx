import { Trash } from 'lucide-react';
import { useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/ui/alert-dialog';
import { Button } from '@/core/components/ui/button';

interface RemoveItemProps {
  onDelete: () => Promise<void>;
}

export const RemoveItem: React.FC<RemoveItemProps> = ({ onDelete }) => {
  const { t } = useTranslation('mainPage');
  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    await onDelete();
    setIsDeleteLoading(false);
    toggleIsOpen();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={toggleIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('modals.removeItemTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('modals.removeItemDesc')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={toggleIsOpen}>
            {t('modals.removeCancel')}
          </Button>
          <Button onClick={handleDelete} loading={isDeleteLoading} variant="destructive">
            {t('modals.removeAccept')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
