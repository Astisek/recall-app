import { BinariesEnum } from '../models/binaries';
import { getBinariesPath } from './getBinaries';
import { spawn } from 'child_process';
import fs from 'fs/promises';

class Ffmpeg {
  private ffmpegPath = getBinariesPath(BinariesEnum.Ffmpeg);

  mp4ToMp3 = (mp4Path: string, mp3Path: string) =>
    new Promise<void>((res, rej) => {
      console.log(this.ffmpegPath, mp4Path, mp3Path);

      const ffmpeg = spawn(this.ffmpegPath, [
        '-i',
        mp4Path,
        '-vn',
        '-acodec',
        'libmp3lame',
        mp3Path,
      ]);

      ffmpeg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          res();
        } else {
          fs.unlink(mp4Path);
          rej('Converting error');
        }
      });
    });

  convertWebpToJpg = async (webpPath: string, jpgPath: string) =>
    new Promise<void>((res, rej) => {
      const ffmpeg = spawn(this.ffmpegPath, ['-y', '-i', webpPath, jpgPath]);

      ffmpeg.stderr.on('data', (data) => {
        console.error('FFmpeg stderr:', data.toString());
      });

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          res();
        } else {
          rej(`FFmpeg exited with code ${code}`);
        }
      });

      ffmpeg.on('error', (err) => {
        rej(err);
      });
    });
}

export const ffmpeg = new Ffmpeg();
