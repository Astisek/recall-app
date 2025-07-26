import { createWriteStream } from 'fs';
import fs from 'fs/promises';

import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';

export const writeMp4FileFromWebStream = (stream: ReadableStream, path: string) =>
  new Promise<void>((res, rej) => {
    const mp4FileReadStream = createWriteStream(path);

    Readable.fromWeb(stream)
      .pipe(mp4FileReadStream)
      .on('error', (e) => {
        mp4FileReadStream.close();
        fs.unlink(path);
        rej(e);
      })
      .on('finish', () => {
        mp4FileReadStream.close();
        res();
      });
  });
