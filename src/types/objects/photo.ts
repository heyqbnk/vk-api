import {ObjectSharedProps, PhotoSize} from './shared';

/**
 * @see https://vk.com/dev/objects/photo
 */
export interface Photo extends ObjectSharedProps {
  albumId: number;
  userId: number;
  text: string;
  date: number;
  sizes: PhotoSize[];
  postId?: number;
  width: number;
  height: number;
}
