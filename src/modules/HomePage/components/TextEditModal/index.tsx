import { Button } from '@/core/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { Input } from '@/core/components/ui/input';
import { useState } from 'react';

interface EditItemProps {
  onEdit: (name: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: string;
  title: string;
  desc: string;
  placeholder: string;
  accept: string;
  cancel: string;
}

export const TextEditModal: React.FC<EditItemProps> = ({
  onEdit,
  defaultValue = '',
  accept,
  cancel,
  desc,
  isOpen,
  onClose,
  placeholder,
  title,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    setIsLoading(true);
    await onEdit(inputValue);
    setIsLoading(false);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setInputValue(defaultValue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <Input value={inputValue} onChange={setInputValue} placeholder={placeholder} />
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {cancel}
          </Button>
          <Button onClick={handleEdit} loading={isLoading}>
            {accept}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
