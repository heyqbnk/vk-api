import {PseudoBooleanType} from '../shared';
import {ObjectSharedProps} from './shared';
import {AttachmentType} from '../attachments';
import {Place} from './place';
import {PostSource} from './post-source';

/**
 * @see https://vk.com/dev/objects/post
 */
export interface Post extends ObjectSharedProps {
  fromId: number;
  createdBy?: number;
  date: number;
  text: string;
  replyOwnerId: number;
  replyPostId: number;
  friendsOnly?: 1;
  comments: {
    count: number;
    canPost?: PseudoBooleanType;
    groupsCanPost: PseudoBooleanType;
    canClose: boolean;
    canOpen: boolean;
  };
  copyright: string;
  likes: {
    count: number;
    userLikes?: PseudoBooleanType;
    canLike?: PseudoBooleanType;
    canPublish?: PseudoBooleanType;
  };
  reposts: {
    count: number;
    userReposted?: PseudoBooleanType;
  };
  views: {
    count: number;
  };
  postType: 'post' | 'copy' | 'reply' | 'postpone' | 'suggest';
  postSource?: PostSource;
  attachments: AttachmentType[];
  geo: {
    type: string;
    coordinates: string;
    place?: Place;
  };
  signerId: number;
  // TODO: API doc is piece of shit
  copyHistory?: any;
  canPin: PseudoBooleanType;
  canEdit: PseudoBooleanType;
  isPinned: PseudoBooleanType;
  markedAsAds: PseudoBooleanType;
  isFavorite: boolean;
  postponedId?: number;
}
