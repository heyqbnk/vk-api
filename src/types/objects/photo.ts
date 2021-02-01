import {IObjectSharedProps, IPhotoSize} from './shared';

/**
 * @see https://vk.com/dev/objects/photo
 */
export interface IPhoto extends IObjectSharedProps {
  albumId: number;
  userId: number;
  text: string;
  date: number;
  sizes: IPhotoSize[];
  postId?: number;
  width: number;
  height: number;
}
