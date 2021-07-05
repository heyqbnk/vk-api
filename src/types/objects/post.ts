import {TPseudoBoolean} from '../shared';
import {IObjectSharedProps} from './shared';
import {TAttachment} from '../attachments';
import {IPlace} from './place';
import {TPostSource} from './post-source';

/**
 * @see https://vk.com/dev/objects/post
 */
export interface IPost extends IObjectSharedProps {
  from_id: number;
  created_by?: number;
  date: number;
  text: string;
  reply_owner_id: number;
  reply_post_id: number;
  friends_only?: 1;
  comments: {
    count: number;
    can_post?: TPseudoBoolean;
    groups_can_post: TPseudoBoolean;
    can_close: boolean;
    can_open: boolean;
  };
  copyright: string;
  likes: {
    count: number;
    user_likes?: TPseudoBoolean;
    can_like?: TPseudoBoolean;
    can_publish?: TPseudoBoolean;
  };
  reposts: {
    count: number;
    user_reposted?: TPseudoBoolean;
  };
  views: {
    count: number;
  };
  post_type: 'post' | 'copy' | 'reply' | 'postpone' | 'suggest';
  post_source?: TPostSource;
  attachments: TAttachment[];
  geo: {
    type: string;
    coordinates: string;
    place?: IPlace;
  };
  signer_id: number;
  // TODO: API doc is piece of shit
  copy_history?: any;
  can_pin: TPseudoBoolean;
  can_edit: TPseudoBoolean;
  is_pinned: TPseudoBoolean;
  marked_as_ads: TPseudoBoolean;
  is_favorite: boolean;
  postponed_id?: number;
}
