import {PseudoBooleanType} from '../shared';

/**
 * List of access connected with page
 * @see https://vk.com/dev/objects/page
 */
export enum PageAccessEnum {
  Admins,
  Participants,
  Everybody,
}

/**
 * @see https://vk.com/dev/objects/page
 */
export interface Page {
  id: number;
  groupId: number;
  creatorId: number;
  title: string;
  currentUserCanEdit: PseudoBooleanType;
  currentUserCanEditAccess: PseudoBooleanType;
  whoCanView: PageAccessEnum;
  whoCanEdit: PageAccessEnum;
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
