import {IObjectSharedProps, IPhotoSize} from './shared';

/**
 * List of doc types.
 * @see https://vk.com/dev/objects/doc
 */
export enum EDocType {
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
export interface IDoc extends IObjectSharedProps {
  title: string;
  size: number;
  ext: string;
  url: string;
  date: number;
  type: EDocType;
  preview: {
    photo?: {
      sizes: IPhotoSize[];
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
