import { MediaTypeEnum } from '@/modules/HomePage/data';

const isYouTubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i;
  return youtubeRegex.test(url);
};

const getYoutubeUrl = (url: string) => {
  if (url.startsWith('https://www.youtube.com/shorts/')) {
    return `https://www.youtube.com/watch?v=${url.replace('https://www.youtube.com/shorts/', '')}`;
  }
  if (url.startsWith('https://youtu.be/')) {
    return `https://www.youtube.com/watch?v=${url.replace('https://youtu.be/', '')}`;
  }

  return url;
};

export const detectMediaUrl = (url: string) => {
  if (isYouTubeUrl(url)) {
    return {
      url: getYoutubeUrl(url),
      source: MediaTypeEnum.Youtube,
    };
  }
};
