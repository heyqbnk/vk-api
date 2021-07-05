/**
 * @see https://vk.com/dev/stats.get
 */
export type TGetParams = {
  timestamp_from?: number;
  timestamp_to?: number;
  interval?: 'day' | 'week' | 'month' | 'year' | 'all';
  intervals_count?: number;
  filters?: string[];
  stats_groups?: 'visitors' | 'reach' | 'activity';
  extended?: boolean;
} & ({ group_id: number } | { app_id: number })

export type TGetResult = Array<{
  period_from: string;
  period_to: string;
  reach: {
    age: Array<{ value: string; count: number }>;
    cities: Array<{ count: number; name: string; value: number }>;
    countries: Array<{
      code: string;
      count: number;
      name: string;
      value: number;
    }>;
    mobile_reach: number;
    reach: number;
    reach_subscribers: number;
    sex: Array<{ value: 'm' | 'f'; count: number }>;
    sex_age: Array<{ value: string; count: number }>;
  };
  visitors: {
    // TODO: Thanks VK for good docs
    cities: Array<unknown>;
    // TODO: Thanks VK for good docs
    countries: Array<unknown>;
    views: number;
    mobile_views: number;
    visitors: number;
  };
}>;

/**
 * @see https://vk.com/dev/stats.getPostReach
 */
export interface IGetPostReachParams {
  owner_id: number;
  post_ids: number[];
}

export interface IGetPostReachResult {
  reach_subscribers: number;
  reach_total: number;
  reach_ads: number;
  reach_viral: number;
  links: number;
  to_group: number;
  join_group: number;
  report: number;
  hide: number;
  unsubscribe: number;
}

/**
 * @see https://vk.com/dev/stats.trackVisitor
 */
export interface ITrackVisitorParams {
}

export type TTrackVisitorResult = 1;
