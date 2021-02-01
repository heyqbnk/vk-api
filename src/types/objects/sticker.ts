import {IImage} from './shared';

/**
 * @see https://vk.com/dev/objects/sticker
 */
export interface ISticker {
  productId: number;
  stickerId: number;
  images: IImage[];
  imagesWithBackground: IImage[];
}
