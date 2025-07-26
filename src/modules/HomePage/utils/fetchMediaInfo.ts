import { ElectronEventEnum } from '@/electron/data/events';
import { IVideoInfo } from '@/electron/models/youtube';
import { MediaTypeEnum } from '@/modules/HomePage/data';
import { IUrlData } from '@/modules/HomePage/models';

export const fetchMediaInfo = (urlData: IUrlData): Promise<IVideoInfo> => {
  switch (urlData.source) {
    case MediaTypeEnum.Youtube:
      return window.ipcRenderer.invoke(ElectronEventEnum.YoutubeGetInfo, urlData.url);
  }
};
