/**
 * @see https://vk.com/dev/stats.get
 */
export type GetParams = {
  timestampFrom?: number;
  timestampTo?: number;
  interval?: 'day' | 'week' | 'month' | 'year' | 'all';
  intervalsCount?: number;
  filters?: string[];
  statsGroups?: 'visitors' | 'reach' | 'activity';
  extended?: boolean;
} & ({ groupId: number } | { appId: number })

export type GetResult = Array<{
  periodFrom: string;
  periodTo: string;
  reach: {
    age: Array<{ value: string; count: number }>;
    cities: Array<{ count: number; name: string; value: number }>;
    countries: Array<{
      code: string;
      count: number;
      name: string;
      value: number;
    }>;
    mobileReach: number;
    reach: number;
    reachSubscribers: number;
    sex: Array<{ value: 'm' | 'f'; count: number }>;
    sexAge: Array<{ value: string; count: number }>;
  };
  visitors: {
    // TODO: Thanks VK for good docs
    cities: Array<unknown>;
    // TODO: Thanks VK for good docs
    countries: Array<unknown>;
    views: number;
    mobileViews: number;
    visitors: number;
  };
}>;

/**
 * @see https://vk.com/dev/stats.getPostReach
 */
export interface GetPostReachParams {
  ownerId: number;
  postIds: number[];
}

export interface GetPostReachResult {
  reachSubscribers: number;
  reachTotal: number;
  reachAds: number;
  reachViral: number;
  links: number;
  toGroup: number;
  joinGroup: number;
  report: number;
  hide: number;
  unsubscribe: number;
}

/**
 * @see https://vk.com/dev/stats.trackVisitor
 */
export interface TrackVisitorParams {
}

export type TrackVisitorResult = 1;
