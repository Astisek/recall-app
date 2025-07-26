import { init as initDirectoryEvents } from './directory';
import { init as initStore } from './store';
import { init as youtubeEvents } from './mediaDownload/youtube';
export const initIpcHandles = () => {
  initDirectoryEvents();
  initStore();
  youtubeEvents();
};
