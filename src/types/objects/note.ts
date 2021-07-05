import {IObjectSharedProps} from './shared';

/**
 * @see https://vk.com/dev/objects/note
 */
export interface INote extends IObjectSharedProps {
  title: string;
  text: string;
  date: number;
  comments: number;
  read_comments: number;
  view_url: string;
}
