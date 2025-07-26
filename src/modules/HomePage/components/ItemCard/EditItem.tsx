import { Button } from '@/core/components/ui/button';
import { TextEditModal } from '@/modules/HomePage/components/TextEditModal';
import { Edit2 } from 'lucide-react';
import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';

interface EditItemProps {
  onEdit: (name: string) => Promise<void>;
  defaultValue: string;
}

export const EditItem: React.FC<EditItemProps> = ({ onEdit, defaultValue }) => {
  const { t } = useTranslation('mainPage');

  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);

  return (
    <>
      <Button size="icon" onClick={toggleIsOpen}>
        <Edit2 className="h-4 w-4" />
      </Button>
      <TextEditModal
        isOpen={isOpen}
        onEdit={onEdit}
        defaultValue={defaultValue}
        onClose={toggleIsOpen}
        accept={t('modals.editAccept')}
        cancel={t('modals.editCancel')}
        desc={t('modals.editDesc')}
        placeholder={t('modals.editDesc')}
        title={t('modals.editTitle')}
      />
    </>
  );
};
