import {ObjectSharedProps, PhotoSize} from './shared';

/**
 * List of doc types
 * @see https://vk.com/dev/objects/doc
 */
export enum DocTypeEnum {
  Text = 1,
  Archive,
  Gif,
  Image,
  Audio,
  Video,
  EBook,
  Unknown,
}

/**
 * @see https://vk.com/dev/objects/doc
 */
export interface Doc extends ObjectSharedProps {
  title: string;
  size: number;
  ext: string;
  url: string;
  date: number;
  type: DocTypeEnum;
  preview: {
    photo?: {
      sizes: PhotoSize[];
    };
    graffiti?: {
      src: string;
      width: number;
      height: number;
    };
    audioMessage?: {
      duration: number;
      waveform: number[];
      linkOgg: string;
      linkMp3: string;
    };
  };
}
