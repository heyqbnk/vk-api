import {Post} from '../../types';

/**
 * @see https://vk.com/dev/widgets.getComments
 */
export interface GetCommentsParams {
  widgetApiId?: number;
  url: string;
  pageId?: string;
  order?: 'date' | 'likes' | 'last_comment';
  fields?: string[];
  offset?: number;
  count?: number;
}

export interface GetCommentsResult {
  count: number;
  posts: Post[];
}

/**
 * @see https://vk.com/dev/widgets.getPages
 */
export interface GetPagesParams {
  widgetApiId?: number;
  order?: 'date' | 'comments' | 'likes' | 'friend_likes';
  period?: 'day' | 'week' | 'month' | 'alltime';
  offset?: number;
  count?: number;
}

export interface GetPagesResult {
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
    pageId: string;
  }>;
}

