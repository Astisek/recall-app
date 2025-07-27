import { store } from './';

export const appStore = {
  getAppVer: () => store.get('app:version') || '',
  setAppVer: (ver: string) => store.set('app:version', ver),
};
