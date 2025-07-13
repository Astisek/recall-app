import { init as initDirectoryHandlers } from './directory';
import { init as initStore } from './store';

export const initIpcHandles = () => {
  initDirectoryHandlers();
  initStore();
};
