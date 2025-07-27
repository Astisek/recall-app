import { init as initDirectoryEvents } from './directory';
import { init as youtubeEvents } from './mediaDownload/youtube';
import { init as initStore } from './store';
export const initIpcHandles = () => {
  initDirectoryEvents();
  initStore();
  youtubeEvents();
};
