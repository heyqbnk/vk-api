import {ObjectSharedProps} from './shared';

/**
 * @see https://vk.com/dev/objects/note
 */
export interface Note extends ObjectSharedProps {
  title: string;
  text: string;
  date: number;
  comments: number;
  readComments: number;
  viewUrl: string;
}
