import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { Folder } from './Folder';
import { Language } from './Language';
import { Theme } from './Theme';
import { Button } from '@/core/components/ui/button';
import SettingsIcon from '@/assets/icons/settings.svg?react';
import { Cookie } from './Cookie';

export const UserSettings: React.FC = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost">
        <SettingsIcon />
      </Button>
    </DialogTrigger>
    <DialogContent className="min-w-[850px]">
      <DialogHeader>
        <DialogTitle>User Settings</DialogTitle>
      </DialogHeader>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 w-1/2">
          <Folder />
          <Theme />
          <Language />
        </div>
        <div className="w-1/2">
          {/* <Account /> */}
          <Cookie />
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
