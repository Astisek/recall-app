import { BrowserWindow } from 'electron';
import { ElectronEventEnum, ElectronNotificationEnum } from '../data/events';

export class Notification {
  private win?: BrowserWindow;

  setWindow = (win: BrowserWindow) => (this.win = win);

  sendNotification = (event: ElectronNotificationEnum, data?: string) =>
    this.win?.webContents.send(ElectronEventEnum.SendNotification, event, data);

  showError = (e: unknown) => {
    if (e instanceof Error) {
      throw e.message;
    }
  };

  removeNotification = (event: ElectronNotificationEnum) =>
    this.sendNotification(ElectronNotificationEnum.RemoveNotification, event);
}
