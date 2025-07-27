import os from 'os';
import path from 'path';
import { BinariesEnum } from '../models/binaries';

const binPath = import.meta.env.PROD
  ? path.join(process.cwd(), 'resources', 'app.asar.unpacked', 'bin')
  : path.join(process.cwd(), 'bin');

const getPlatform = () => {
  const rawPlatform = os.platform();

  if (rawPlatform === 'darwin') return 'mac';
  if (rawPlatform === 'win32') return 'win';

  if (rawPlatform !== 'linux') {
    console.error('Unsupported platform.', rawPlatform);
    process.exit(1);
  }

  return 'linux';
};

export const getBinariesPath = (fileName: BinariesEnum) => {
  const platform = getPlatform();
  const arch = os.arch();

  if (platform === 'mac' && arch !== 'x64' && arch !== 'arm64') {
    console.error('Unsupported architecture.');
    process.exit(1);
  }

  const binExecutable = platform === 'win' ? `${fileName}.exe` : fileName;

  return path.join(binPath, platform, arch, binExecutable);
};
