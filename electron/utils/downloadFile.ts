import { createWriteStream } from 'fs';
import fs from 'fs/promises';
import https from 'https';

export const downloadFile = (url: string, outputPath: string) => {
  const file = createWriteStream(outputPath);

  return new Promise<void>((res, rej) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          rej(response.statusCode);
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          res();
        });
      })
      .on('error', (err) => {
        fs.unlink(outputPath);
        rej(err.message);
      });
  });
};
