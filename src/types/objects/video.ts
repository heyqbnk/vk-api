import {ObjectSharedProps} from './shared';
import {PseudoBooleanType} from '../shared';

/**
 * @see https://vk.com/dev/objects/video
 */
export interface Video extends ObjectSharedProps {
  title: string;
  description: string;
  duration: number;
  photo130: string;
  photo320: string;
  photo640?: string;
  photo800?: string;
  photo1280?: string;
  firstFrame130: string;
  firstFrame320: string;
  firstFrame640?: string;
  firstFrame800?: string;
  firstFrame1280?: string;
  date: number;
  addingDate: number;
  views: number;
  comments: number;
  player: string;
  platform: string;
  canEdit?: 1;
  canAdd: PseudoBooleanType;
  isPrivate?: 1;
  accessKey: string;
  processing?: 1;
  live?: 1;
  upcoming?: 1;
  isFavorite: boolean;
}
