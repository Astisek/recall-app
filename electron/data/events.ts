export enum ElectronEventEnum {
  SelectDirectory = 'user-settings:select-directory',
  SetDirectory = 'user-settings:set-directory',
  ParseDirectoryTree = 'user-settings:parse-directory-tree',
  GetStores = 'store:get-store',
  RemoveItem = 'directory:remove-item',
  EditItemName = 'directory:edit-item-name',
  OpenDirectory = 'directory:open-directory',
  CreateDirectory = 'directory:create-directory',

  YoutubeGetInfo = 'youtube:get-info',
  YoutubeDownload = 'youtube:download-media',
  YoutubeSetCookie = 'youtube:set-cookie',

  SendNotification = 'notification:send-notification',
}

export enum ElectronNotificationEnum {
  RemoveNotification = '500',
  MediaDownloading = '1000',
  MediaProcessing = '2000',
  Error = '3000',
  DownloadComplete = '4000',
  AppUpdated = '5000',
}
