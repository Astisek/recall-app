import { IFileTreeNode } from '../models/fileTree';
import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

export async function readDirectory(dirPath: string): Promise<IFileTreeNode[]> {
  let entries: Dirent[];

  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch (error) {
    throw new Error('Something wrong!');
  }

  return entries.reduce<Promise<IFileTreeNode[]>>(async (accPromise, entry) => {
    const acc = await accPromise;
    const fullPath = path.join(dirPath, entry.name);
    const isDirectory = entry.isDirectory();

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
}
