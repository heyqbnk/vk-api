import {IImage} from './shared';

/**
 * @see https://vk.com/dev/objects/sticker
 */
export interface ISticker {
  product_id: number;
  sticker_id: number;
  images: IImage[];
  images_with_background: IImage[];
}
