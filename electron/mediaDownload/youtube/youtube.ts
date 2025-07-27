import Innertube from 'youtubei.js';
import { userSettingsStore } from '../../store/userSettings.store';

class Youtube {
  private innertube?: Innertube;

  constructor() {
    this.initialize();
  }

  initialize = async () => {
    this.innertube = await Innertube.create({
      cookie: userSettingsStore.getYoutubeCookie(),
    });
  };

  getStream = (url: string) => this.yt.download(this.getVideoId(url));
  getVideoInfo = (url: string) => this.yt.getBasicInfo(this.getVideoId(url));

  private get yt() {
    if (!this.innertube) {
      // FIX: All errors to consts
      throw new Error('Youtube module not initialized!');
    }
    return this.innertube;
  }

  private getVideoId = (url: string) => {
    const searchParams = this.urlParams(url);
    return searchParams.get('v') || '';
  };

  private urlParams = (url: string) => {
    const [, search] = url.split('?');
    const searchParams = new URLSearchParams(search);
    return searchParams;
  };
}

export const youtube = new Youtube();
