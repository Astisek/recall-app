import { Skeleton } from '@/core/components/ui/skeleton';
import { preloadImage } from '@/shared/utils/preloadImage';
import { HTMLProps, useEffect, useState } from 'react';

export const Image: React.FC<HTMLProps<HTMLImageElement>> = ({ src = '', className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await preloadImage(src);
        setIsLoading(false);
      } catch (e) {
        console.log('preloadImage error:', e);
      }
    })();
  }, [src]);

  return isLoading ? (
    <Skeleton className={className} />
  ) : (
    <img src={src} className={className} {...props} />
  );
};
