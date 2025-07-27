import fs from 'fs/promises';
import path from 'path';
import { availableFileExts } from '../data/files';
import { IFileTreeNode } from '../models/fileTree';

export const readDirectory = async (dirPath: string): Promise<IFileTreeNode[]> => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  return entries.reduce<Promise<IFileTreeNode[]>>(async (accPromise, entry) => {
    const acc = await accPromise;
    const fullPath = path.join(dirPath, entry.name);
    const isDirectory = entry.isDirectory();
    const fileExt = entry.name.split('.').pop()?.toLowerCase() || '';

    if (!availableFileExts.includes(fileExt) && !isDirectory) {
      return await accPromise;
    }

    const node: IFileTreeNode = {
      name: entry.name,
      path: fullPath,
      isDirectory,
    };

    if (isDirectory) {
      node.children = await readDirectory(fullPath);
    }

    return [...acc, node];
  }, Promise.resolve([]));
};
