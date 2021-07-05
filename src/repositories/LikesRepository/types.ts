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
  owner_id?: number;
  item_id: number;
  access_key: string;
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
  owner_id: number;
  item_id: number;
  page_url?: string;
  filter?: 'likes' | 'copies';
  friends_only?: boolean;
  extended?: boolean;
  offset?: number;
  count?: number;
  skip_own?: boolean;
}

export interface IGetListResult extends IPager<number> {
}

/**
 * @see https://vk.com/dev/likes.isLiked
 */
export interface IIsLikedParams {
  user_id?: number;
  type: TObjectType;
  owner_id?: number;
  item_id: number;
}

export interface IIsLikedResult {
  liked: TPseudoBoolean;
  copied: TPseudoBoolean;
}