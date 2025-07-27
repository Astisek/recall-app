import fs from 'fs/promises';
import path from 'path';
import { app } from 'electron';
import { name } from '../../package.json';

class Temp {
  private appTempPath = path.join(app.getPath('temp'), name);

  constructor() {
    this.generatePath();
  }

  tempFilePath = (filePath: string) => path.join(this.appTempPath, filePath);

  private generatePath = async () => {
    await fs.mkdir(this.appTempPath, { recursive: true });
  };
}

export const temp = new Temp();
