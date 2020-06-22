export type MonthlyTierType =
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
export interface GetServerUrlParams {
}

export interface GetServerUrlResult {
  endpoint: string;
  key: string;
}

/**
 * @see https://vk.com/dev/streaming.getSettings
 */
export interface GetSettingsParams {

}

export interface GetSettingsResult {
  monthlyLimit: MonthlyTierType;
}

/**
 * @see https://vk.com/dev/streaming.getStats
 */
export interface GetStatsParams {
  type: 'received' | 'prepared';
  interval?: '5m' | '1h' | '24h';
  startTime?: number;
  endTime?: number;
}

export interface GetStatsResult {
  eventType: 'post' | 'comment' | 'share';
  stats: Array<{ timestamp: number; value: number }>;
}

/**
 * @see https://vk.com/dev/streaming.getStem
 */
export interface GetStemParams {
  word: string;
}

export interface GetStemResult {
  stem: string;
}

/**
 * @see https://vk.com/dev/streaming.setSettings
 */
export interface SetSettingsParams {
  monthlyTier: MonthlyTierType;
}

export type SetSettingsResult = 1;
