import {IPager, TPseudoBoolean} from '../../types';

/**
 * @see https://vk.com/dev/utils.checkLink
 */
export interface ICheckLinkParams {
  url: string;
}

export interface ICheckLinkResult {
  status: 'not_banned' | 'banned' | 'processing';
  link: string;
}

/**
 * @see https://vk.com/dev/utils.deleteFromLastShortened
 */
export interface IDeleteFromLastShortenedParams {
  key: string;
}

export type TDeleteFromLastShortenedResult = 1;

/**
 * @see https://vk.com/dev/utils.getLastShortenedLinks
 */
export interface IGetLastShortenedLinksParams {
  count?: number;
  offset?: number;
}

export type TGetLastShortenedLinksResult = IPager<{
  timestamp: number;
  url: string;
  short_url: string;
  key: string;
  views: number;
  access_key?: string;
}>;

/**
 * @see https://vk.com/dev/utils.getLinkStats
 */
export interface IGetLinkStatsParams {
  key: string;
  source?: string;
  access_key?: string;
  interval?: 'hour' | 'day' | 'week' | 'month' | 'forever';
  intervals_count?: number;
  extended?: boolean;
}

export interface IGetLinkStatsResult {
  key: string;
  stats: Array<{
    timestamp: number;
    views: number;
    sex_age: Array<{
      age_range: string;
      female: TPseudoBoolean;
      male: TPseudoBoolean;
    }>;
    countries: Array<{
      country_id: number;
      views: number;
    }>;
    cities: Array<{
      city_id: number;
      views: number;
    }>;
  }>;
}

/**
 * @see https://vk.com/dev/utils.getServerTime
 */
export interface IGetServerTimeParams {
}

export type TGetServerTimeResult = number;

/**
 * @see https://vk.com/dev/utils.getShortLink
 */
export interface IGetShortLinkParams {
  url: string;
  private?: boolean;
}

export interface IGetShortLinkResult {
  short_url: string;
  url: string;
  key: string;
  access_key?: string;
}

/**
 * @see https://vk.com/dev/utils.resolveScreenName
 */
export interface IResolveScreenNameParams {
  screen_name: string;
}

export type TResolveScreenNameResult = {
  type: 'user' | 'group' | 'application';
  object_id: number;
} | {};
