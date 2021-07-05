import {IObjectSharedProps, IPhotoSize} from './shared';

/**
 * @see https://vk.com/dev/objects/photo
 */
export interface IPhoto extends IObjectSharedProps {
  album_id: number;
  user_id: number;
  text: string;
  date: number;
  sizes: IPhotoSize[];
  post_id?: number;
  width: number;
  height: number;
}
