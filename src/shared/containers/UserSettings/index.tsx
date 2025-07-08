import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { Account } from './Account';
import { Folder } from './Folder';
import { Language } from './Language';
import { Theme } from './Theme';
import { Button } from '@/core/components/ui/button';
import SettingsIcon from '@/assets/icons/settings.svg?react';

export const UserSettings: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-9/12">
        <DialogHeader>
          <DialogTitle>User Settings</DialogTitle>
        </DialogHeader>
        <div className="flex gap-10">
          <div className="flex flex-col gap-5">
            <Folder />
            <Theme />
            <Language />
          </div>
          <div>
            <Account />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
