import {IObjectSharedProps} from './shared';
import {TPseudoBoolean} from '../shared';

/**
 * @see https://vk.com/dev/objects/video
 */
export interface IVideo extends IObjectSharedProps {
  title: string;
  description: string;
  duration: number;
  photo_130: string;
  photo_320: string;
  photo_640?: string;
  photo_800?: string;
  photo_1280?: string;
  first_frame_130: string;
  first_frame_320: string;
  first_frame_640?: string;
  first_frame_800?: string;
  first_frame_1280?: string;
  date: number;
  adding_date: number;
  views: number;
  comments: number;
  player: string;
  platform: string;
  can_edit?: 1;
  can_add: TPseudoBoolean;
  is_private?: 1;
  access_key: string;
  processing?: 1;
  live?: 1;
  upcoming?: 1;
  is_favorite: boolean;
}
