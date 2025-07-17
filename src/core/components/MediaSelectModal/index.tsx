import { Drawer, DrawerContent } from '@/core/components/ui/drawer';
import { useState } from 'react';
import { VideoInfo } from '@/core/components/MediaSelectModal/VideoInfo';
import { DirectoryView } from '@/core/components/MediaSelectModal/DirectoryView';
import { DirectoryNodeFooter } from '@/core/components/MediaSelectModal/DirectoryNodeFooter';

interface MediaSelectModalProps {
  onClose: () => void;
  url: string;
}

export const MediaSelectModal: React.FC<MediaSelectModalProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Drawer open onOpenChange={onClose}>
      <DrawerContent>
        <div className="flex flex-col p-4 gap-6 h-[470px]">
          <div className="flex gap-6">
            <VideoInfo isLoading={isLoading} />

            <DirectoryView isLoading={isLoading} />
          </div>

          <DirectoryNodeFooter />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
