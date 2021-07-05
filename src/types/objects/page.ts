import {TPseudoBoolean} from '../shared';

/**
 * List of access connected with page.
 * @see https://vk.com/dev/objects/page
 */
export enum EPageAccess {
  Admins,
  Participants,
  Everybody,
}

/**
 * @see https://vk.com/dev/objects/page
 */
export interface IPage {
  id: number;
  group_id: number;
  creator_id: number;
  title: string;
  current_user_can_edit: TPseudoBoolean;
  current_user_can_editAccess: TPseudoBoolean;
  who_can_view: EPageAccess;
  who_can_edit: EPageAccess;
  edited: number;
  created: number;
  editor_id: number;
  views: number;
  parent?: string;
  parent2?: string;
  source?: string;
  html?: string;
  view_url: string;
}
