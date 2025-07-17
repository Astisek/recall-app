import { Skeleton } from '@/core/components/ui/skeleton';

interface VideoInfoProps {
  isLoading: boolean;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({ isLoading }) => (
  <div className="w-1/2 space-y-4">
    {isLoading ? (
      <>
        <Skeleton className="w-full aspect-video rounded-md" />
        <Skeleton className="w-3/4 h-6 rounded" />
      </>
    ) : (
      <>
        <img
          src={'https://images.prom.ua/6552777201_w600_h600_6552777201.jpg'}
          alt="Video Preview"
          className="w-full aspect-video object-cover rounded-md"
        />
        <h2 className="text-lg font-semibold leading-tight line-clamp-2 overflow-hidden text-ellipsis">
          {
            'Играю под Полторахой Пива [GTA RP] Играю под Полторахой Пива [GTA RP]Играю под Полторахой Пива [GTA RP]Играю под Полторахой Пива [GTA RP]Играю под Полторахой Пива [GTA RP]'
          }
        </h2>
      </>
    )}
  </div>
);
