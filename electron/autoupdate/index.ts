import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import { ElectronNotificationEnum } from '../data/events';
import { notifications } from '../main';
import { appStore } from '../store/app.store';

export class AppAutoUpdater {
  constructor() {
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    this.init();
  }

  private init = async () => {
    await autoUpdater.checkForUpdates();
    this.checkUpdated();
  };

  private checkUpdated = () => {
    const currentVersion = app.getVersion();
    const prevVersion = appStore.getAppVer() || currentVersion;

    console.log('prevVersion: ', prevVersion);
    console.log('currentVersion: ', currentVersion);

    if (currentVersion !== prevVersion) {
      notifications.sendNotification(ElectronNotificationEnum.AppUpdated, currentVersion);
    }

    appStore.setAppVer(currentVersion);
  };
}
