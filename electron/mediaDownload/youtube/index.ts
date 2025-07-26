import { youtube } from './youtube';
import { ElectronEventEnum, ElectronNotificationEnum } from '../../data/events';
import { ipcMain } from 'electron';
import { IVideoInfo } from '../../models/youtube';
import { temp } from '../../utils/temp';
import { ReadableStream } from 'stream/web';
import { ffmpeg } from '../../utils/ffmpeg';
import { formatFileName } from '../../utils/formatFileName';
import { writeMp4FileFromWebStream } from '../../utils/writeMp4FileFromWebStream';
import fs from 'fs/promises';
import { v4 } from 'uuid';
import path from 'path';
import { notifications } from '../../main';
import { userSettingsStore } from '../../store/userSettings.store';
import { downloadFile } from '../../utils/downloadFile';
import { writeImageInMp3 } from '../../utils/writeImageInMp3';

export const init = () => {
  ipcMain.handle(
    ElectronEventEnum.YoutubeGetInfo,
    async (_, url: string): Promise<IVideoInfo | undefined> => {
      try {
        const {
          basic_info: { thumbnail, title = '' },
        } = await youtube.getVideoInfo(url);

        return {
          thumbnail: thumbnail?.[0].url,
          title,
        };
      } catch (e) {
        notifications.showError(e);
      }
    },
  );

  ipcMain.handle(ElectronEventEnum.YoutubeSetCookie, async (_, cookie: string) => {
    userSettingsStore.setYoutubeCookie(cookie);
    await youtube.initialize();
  });

  ipcMain.handle(
    ElectronEventEnum.YoutubeDownload,
    async (_, url: string, videoInfo: IVideoInfo, directory: string) => {
      try {
        notifications.sendNotification(ElectronNotificationEnum.MediaDownloading);

        const title = formatFileName(videoInfo.title);
        const tempName = v4();
        const stream = (await youtube.getStream(url)) as ReadableStream;

        const mp4FilePath = temp.tempFilePath(`${tempName}.mp4`);
        const mp3FilePath = temp.tempFilePath(`${tempName}.mp3`);
        const webpFilePath = temp.tempFilePath(`${tempName}.webp`);
        const jpgFilePath = temp.tempFilePath(`${tempName}.jpg`);

        const mp3Promise = async () => {
          await writeMp4FileFromWebStream(stream, mp4FilePath);

          notifications.sendNotification(ElectronNotificationEnum.MediaProcessing);

          await ffmpeg.mp4ToMp3(mp4FilePath, mp3FilePath);
        };
        const jpgPromise = async () => {
          await downloadFile(videoInfo.thumbnail || '', webpFilePath);
          await ffmpeg.convertWebpToJpg(webpFilePath, jpgFilePath);
        };
        await Promise.all([mp3Promise(), jpgPromise()]);

        await writeImageInMp3(mp3FilePath, title, jpgFilePath);

        const finalPath = path.join(directory, `${title}.mp3`);
        await fs.copyFile(mp3FilePath, finalPath);

        await Promise.all([
          fs.unlink(mp4FilePath),
          fs.unlink(mp3FilePath),
          fs.unlink(webpFilePath),
          fs.unlink(jpgFilePath),
        ]);

        notifications.sendNotification(ElectronNotificationEnum.DownloadComplete);
      } catch (e) {
        console.log(e);

        notifications.showError(e);
      } finally {
        notifications.sendNotification(
          ElectronNotificationEnum.RemoveNotification,
          ElectronNotificationEnum.MediaProcessing,
        );
        notifications.sendNotification(
          ElectronNotificationEnum.RemoveNotification,
          ElectronNotificationEnum.MediaDownloading,
        );
      }
    },
  );
};
