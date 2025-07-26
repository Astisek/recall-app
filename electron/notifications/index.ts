import { ElectronEventEnum, ElectronNotificationEnum } from '../data/events';
import { BrowserWindow } from 'electron';

export class Notification {
  private win?: BrowserWindow;

  setWindow = (win: BrowserWindow) => (this.win = win);

  sendNotification = (event: ElectronNotificationEnum, data?: string) =>
    this.win?.webContents.send(ElectronEventEnum.SendNotification, event, data);

  showError = (e: unknown) => {
    if (e instanceof Error) {
      return this.win?.webContents.send(
        ElectronEventEnum.SendNotification,
        ElectronNotificationEnum.Error,
        e.message,
      );
    }
  };
}
