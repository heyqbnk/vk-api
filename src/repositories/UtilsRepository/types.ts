import {Pager, PseudoBooleanType} from '../../types';

/**
 * @see https://vk.com/dev/utils.checkLink
 */
export interface CheckLinkParams {
  url: string;
}

export interface CheckLinkResult {
  status: 'not_banned' | 'banned' | 'processing';
  link: string;
}

/**
 * @see https://vk.com/dev/utils.deleteFromLastShortened
 */
export interface DeleteFromLastShortenedParams {
  key: string;
}

export type DeleteFromLastShortenedResult = 1;

/**
 * @see https://vk.com/dev/utils.getLastShortenedLinks
 */
export interface GetLastShortenedLinksParams {
  count?: number;
  offset?: number;
}

export type GetLastShortenedLinksResult = Pager<{
  timestamp: number;
  url: string;
  shortUrl: string;
  key: string;
  views: number;
  accessKey: string;
}>;

/**
 * @see https://vk.com/dev/utils.getLinkStats
 */
export interface GetLinkStatsParams {
  key: string;
  source?: string;
  accessKey?: string;
  interval?: 'hour' | 'day' | 'week' | 'month' | 'forever';
  intervalsCount?: number;
  extended?: boolean;
}

export interface GetLinkStatsResult {
  key: string;
  stats: Array<{
    timestamp: number;
    views: number;
    sexAge: Array<{
      ageRange: string;
      female: PseudoBooleanType;
      male: PseudoBooleanType;
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
export interface GetServerTimeParams {
}

export type GetServerTimeResult = number;

/**
 * @see https://vk.com/dev/utils.getShortLink
 */
export interface GetShortLinkParams {
  url: string;
  private?: boolean;
}

export interface GetShortLinkResult {
  shortUrl: string;
  url: string;
  key: string;
  accessKey?: string;
}

/**
 * @see https://vk.com/dev/utils.resolveScreenName
 */
export interface ResolveScreenNameParams {
  screenName: string;
}

export type ResolveScreenNameResult = {
  type: 'user' | 'group' | 'application';
  objectId: number;
} | {};
