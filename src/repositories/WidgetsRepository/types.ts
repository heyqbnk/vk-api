import {IPost} from '../../types';

/**
 * @see https://vk.com/dev/widgets.getComments
 */
export interface IGetCommentsParams {
  widget_api_id?: number;
  url: string;
  page_id?: string;
  order?: 'date' | 'likes' | 'last_comment';
  fields?: string[];
  offset?: number;
  count?: number;
}

export interface IGetCommentsResult {
  count: number;
  posts: IPost[];
}

/**
 * @see https://vk.com/dev/widgets.getPages
 */
export interface IGetPagesParams {
  widget_api_id?: number;
  order?: 'date' | 'comments' | 'likes' | 'friend_likes';
  period?: 'day' | 'week' | 'month' | 'alltime';
  offset?: number;
  count?: number;
}

export interface IGetPagesResult {
  count: number;
  pages: Array<{
    id: string;
    title: string;
    description: string;
    // NOTE: Not found in response but stated in docs
    // photo: any;
    url: string;
    likes: {
      count: number;
    };
    comments: {
      count: number;
    };
    date: number;
    page_id: string;
  }>;
}

