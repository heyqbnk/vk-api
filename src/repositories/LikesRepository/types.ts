import {IPager, TPseudoBoolean} from '../../types';

type TObjectType =
  | 'post'
  | 'comment'
  | 'photo'
  | 'audio'
  | 'video'
  | 'note'
  | 'market'
  | 'photo_comment'
  | 'video_comment'
  | 'topic_comment'
  | 'market_comment';

/**
 * @see https://vk.com/dev/likes.add
 */
export interface IAddParams {
  type: TObjectType;
  ownerId?: number;
  itemId: number;
  accessKey: string;
}

export interface IAddResult {
  likes: number;
}

/**
 * @see https://vk.com/dev/likes.delete
 */
export interface IDeleteParams extends IAddParams {
}

export interface IDeleteResult extends IAddResult {
}

/**
 * @see https://vk.com/dev/likes.getList
 */
export interface IGetListParams {
  type: TObjectType;
  ownerId: number;
  itemId: number;
  pageUrl?: string;
  filter?: 'likes' | 'copies';
  friendsOnly?: boolean;
  extended?: boolean;
  offset?: number;
  count?: number;
  skipOwn?: boolean;
}

export interface IGetListResult extends IPager<number> {
}

/**
 * @see https://vk.com/dev/likes.isLiked
 */
export interface IIsLikedParams {
  userId?: number;
  type: TObjectType;
  ownerId?: number;
  itemId: number;
}

export interface IIsLikedResult {
  liked: TPseudoBoolean;
  copied: TPseudoBoolean;
}