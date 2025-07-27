import { useEffect, useState } from 'react';
import { Drawer, DrawerContent } from '@/core/components/ui/drawer';
import { IVideoInfo } from '@/electron/models/youtube';
import { DirectoryNodeFooter } from '@/modules/HomePage/components/MediaSelectModal/DirectoryNodeFooter';
import { DirectorySelector } from '@/modules/HomePage/components/MediaSelectModal/DirectorySelector';
import { VideoInfo } from '@/modules/HomePage/components/MediaSelectModal/VideoInfo';
import { IUrlData } from '@/modules/HomePage/models';
import { downloadMedia } from '@/modules/HomePage/utils/downloadMedia';
import { fetchMediaInfo } from '@/modules/HomePage/utils/fetchMediaInfo';
import { useNotification } from '@/shared/hooks/useNotification';
import { useUpdateDirectoryTree } from '@/shared/hooks/useUpdateDirectoryTree';
import { useMediaSelectStore } from '@/stores/useMediaSelectStore';

interface MediaSelectModalProps {
  onClose: () => void;
  urlData: IUrlData;
}

export const MediaSelectModal: React.FC<MediaSelectModalProps> = ({ onClose, urlData }) => {
  const updateDirectoryTree = useUpdateDirectoryTree();
  const { selectedTree, setSelectedTree } = useMediaSelectStore();
  const { showErrorNotification } = useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<IVideoInfo>();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const videoInfo = await fetchMediaInfo(urlData);

        setVideoInfo(videoInfo);
        setIsLoading(false);
      } catch (e) {
        showErrorNotification(e);
      }
    })();

    return setSelectedTree;
  }, [onClose, setSelectedTree, showErrorNotification, urlData]);

  const handleAddMedia = async () => {
    try {
      setIsDownloading(true);
      await downloadMedia(urlData, videoInfo, selectedTree?.path);
      await updateDirectoryTree();
    } catch (e) {
      showErrorNotification(e);
    } finally {
      onClose();
    }
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
