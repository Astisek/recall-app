export const preloadImage = (src: string) =>
  new Promise<void>((res, rej) => {
    const img = new Image();
    img.onload = function () {
      res();
    };
    img.onerror = function () {
      rej(src);
    };
    img.src = src;
  });
