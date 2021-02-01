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
  groupId: number;
  creatorId: number;
  title: string;
  currentUserCanEdit: TPseudoBoolean;
  currentUserCanEditAccess: TPseudoBoolean;
  whoCanView: EPageAccess;
  whoCanEdit: EPageAccess;
  edited: number;
  created: number;
  editorId: number;
  views: number;
  parent?: string;
  parent2?: string;
  source?: string;
  html?: string;
  viewUrl: string;
}
