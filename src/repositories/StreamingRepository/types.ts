export type TMonthlyTier =
  | 'unlimited'
  | 'tier_1'
  | 'tier_2'
  | 'tier_3'
  | 'tier_4'
  | 'tier_5'
  | 'tier_6';

/**
 * @see https://vk.com/dev/streaming.getServerUrl
 */
export interface IGetServerUrlParams {
}

export interface IGetServerUrlResult {
  endpoint: string;
  key: string;
}

/**
 * @see https://vk.com/dev/streaming.getSettings
 */
export interface IGetSettingsParams {
}

export interface IGetSettingsResult {
  monthly_limit: TMonthlyTier;
}

/**
 * @see https://vk.com/dev/streaming.getStats
 */
export interface IGetStatsParams {
  type: 'received' | 'prepared';
  interval?: '5m' | '1h' | '24h';
  start_time?: number;
  end_time?: number;
}

export interface IGetStatsResult {
  event_type: 'post' | 'comment' | 'share';
  stats: Array<{ timestamp: number; value: number }>;
}

/**
 * @see https://vk.com/dev/streaming.getStem
 */
export interface IGetStemParams {
  word: string;
}

export interface IGetStemResult {
  stem: string;
}

/**
 * @see https://vk.com/dev/streaming.setSettings
 */
export interface ISetSettingsParams {
  monthly_tier: TMonthlyTier;
}

export type TSetSettingsResult = 1;
