import { IFileTreeNode } from './fileTree';

export interface IElectronStore {
  ['userSettings:directoryPath']: string;
  ['userSettings:directoryTree']: IFileTreeNode[];
  ['app:version']: string;
  ['userSettings:rootDirectoryName']: string;
}

export interface IElectronClientStore {
  userSettings: {
    directoryPath: string;
    cookie: string;
    rootDirectoryPath: string;
  };
}
