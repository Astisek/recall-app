import fs from 'fs/promises';
import NodeID3 from 'node-id3';

export const writeImageInMp3 = async (mp3Path: string, title: string, jpgPath: string) => {
  const imageBuffer = await fs.readFile(jpgPath);

  const status = NodeID3.write(
    {
      title,
      image: {
        mime: 'image/jpeg',
        description: 'Image',
        type: {
          id: 3,
          name: 'front cover',
        },
        imageBuffer,
      },
    },
    mp3Path,
  );

  if (status instanceof Error) {
    throw status;
  }
};
