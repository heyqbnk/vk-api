import {TPseudoBoolean} from '../shared';
import {IObjectSharedProps} from './shared';
import {TAttachment} from '../attachments';
import {IPlace} from './place';
import {TPostSource} from './post-source';

/**
 * @see https://vk.com/dev/objects/post
 */
export interface IPost extends IObjectSharedProps {
  fromId: number;
  createdBy?: number;
  date: number;
  text: string;
  replyOwnerId: number;
  replyPostId: number;
  friendsOnly?: 1;
  comments: {
    count: number;
    canPost?: TPseudoBoolean;
    groupsCanPost: TPseudoBoolean;
    canClose: boolean;
    canOpen: boolean;
  };
  copyright: string;
  likes: {
    count: number;
    userLikes?: TPseudoBoolean;
    canLike?: TPseudoBoolean;
    canPublish?: TPseudoBoolean;
  };
  reposts: {
    count: number;
    userReposted?: TPseudoBoolean;
  };
  views: {
    count: number;
  };
  postType: 'post' | 'copy' | 'reply' | 'postpone' | 'suggest';
  postSource?: TPostSource;
  attachments: TAttachment[];
  geo: {
    type: string;
    coordinates: string;
    place?: IPlace;
  };
  signerId: number;
  // TODO: API doc is piece of shit
  copyHistory?: any;
  canPin: TPseudoBoolean;
  canEdit: TPseudoBoolean;
  isPinned: TPseudoBoolean;
  markedAsAds: TPseudoBoolean;
  isFavorite: boolean;
  postponedId?: number;
}
