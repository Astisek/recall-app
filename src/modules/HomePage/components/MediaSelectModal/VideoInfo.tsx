import { Skeleton } from '@/core/components/ui/skeleton';
import { IVideoInfo } from '@/electron/models/youtube';
import { Image } from '@/shared/components/Image';

interface VideoInfoProps {
  isLoading: boolean;
  videoInfo?: IVideoInfo;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({ isLoading, videoInfo }) => (
  <div className="w-1/2 space-y-4">
    {isLoading ? (
      <>
        <Skeleton className="w-full aspect-video rounded-md" />
        <Skeleton className="w-3/4 h-6 rounded" />
      </>
    ) : (
      <>
        <Image
          src={videoInfo?.thumbnail}
          alt="Video Preview"
          className="w-full aspect-video object-cover rounded-md"
        />
        <h2 className="text-lg font-semibold leading-tight line-clamp-2 overflow-hidden text-ellipsis">
          {videoInfo?.title}
        </h2>
      </>
    )}
  </div>
);
