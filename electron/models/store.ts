import { IFileTreeNode } from './fileTree';

export interface IElectronStore {
  ['userSettings:directoryPath']: string;
  ['userSettings:directoryTree']: IFileTreeNode[];
}

export interface IElectronClientStore {
  userSettings: {
    directoryPath: string;
    directoryTree: IFileTreeNode[];
  };
}
