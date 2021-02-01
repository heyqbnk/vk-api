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
  shortUrl: string;
  key: string;
  views: number;
  accessKey?: string;
}>;

/**
 * @see https://vk.com/dev/utils.getLinkStats
 */
export interface IGetLinkStatsParams {
  key: string;
  source?: string;
  accessKey?: string;
  interval?: 'hour' | 'day' | 'week' | 'month' | 'forever';
  intervalsCount?: number;
  extended?: boolean;
}

export interface IGetLinkStatsResult {
  key: string;
  stats: Array<{
    timestamp: number;
    views: number;
    sexAge: Array<{
      ageRange: string;
      female: TPseudoBoolean;
      male: TPseudoBoolean;
    }>;
    countries: Array<{
      countryId: number;
      views: number;
    }>;
    cities: Array<{
      cityId: number;
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
  shortUrl: string;
  url: string;
  key: string;
  accessKey?: string;
}

/**
 * @see https://vk.com/dev/utils.resolveScreenName
 */
export interface IResolveScreenNameParams {
  screenName: string;
}

export type TResolveScreenNameResult = {
  type: 'user' | 'group' | 'application';
  objectId: number;
} | {};
