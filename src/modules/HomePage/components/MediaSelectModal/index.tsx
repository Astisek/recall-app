import { Drawer, DrawerContent } from '@/core/components/ui/drawer';
import { useEffect, useState } from 'react';
import { VideoInfo } from '@/modules/HomePage/components/MediaSelectModal/VideoInfo';
import { DirectorySelector } from '@/modules/HomePage/components/MediaSelectModal/DirectorySelector';
import { IUrlData } from '@/modules/HomePage/models';
import { fetchMediaInfo } from '@/modules/HomePage/utils/fetchMediaInfo';
import { IVideoInfo } from '@/electron/models/youtube';
import { DirectoryNodeFooter } from '@/modules/HomePage/components/MediaSelectModal/DirectoryNodeFooter';
import { downloadMedia } from '@/modules/HomePage/utils/downloadMedia';
import { useMediaSelectStore } from '@/stores/useMediaSelectStore';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { useNotification } from '@/shared/hooks/useNotification';
import { useTranslation } from 'react-i18next';

interface MediaSelectModalProps {
  onClose: () => void;
  urlData: IUrlData;
}

export const MediaSelectModal: React.FC<MediaSelectModalProps> = ({ onClose, urlData }) => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { selectedTree, setSelectedTree } = useMediaSelectStore();
  const { showNotification } = useNotification();
  const { t } = useTranslation('notification');

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<IVideoInfo>();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const videoInfo = await fetchMediaInfo(urlData);

      setVideoInfo(videoInfo);
      setIsLoading(false);
    })();

    return setSelectedTree;
  }, [onClose, setSelectedTree, urlData]);

  const handleAddMedia = async () => {
    setIsDownloading(true);
    await downloadMedia(urlData, videoInfo, selectedTree?.path);
    await updateDirectoryTree();
    onClose();
  };

  return (
    <Drawer open onOpenChange={onClose}>
      <DrawerContent>
        <div className="flex p-4 gap-6 justify-between">
          <VideoInfo isLoading={isLoading} videoInfo={videoInfo} />

          <div className="flex flex-col w-1/2 gap-4">
            <DirectorySelector isLoading={isLoading} />
            <DirectoryNodeFooter
              isLoading={isLoading}
              onAdd={handleAddMedia}
              isDownloading={isDownloading}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
