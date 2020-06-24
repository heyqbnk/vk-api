import {Image} from './shared';

/**
 * @see https://vk.com/dev/objects/sticker
 */
export interface Sticker {
  productId: number;
  stickerId: number;
  images: Image[];
  imagesWithBackground: Image[];
}
