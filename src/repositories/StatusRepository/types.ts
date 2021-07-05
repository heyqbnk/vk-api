import {IAudio} from '../../types';

/**
 * @see https://vk.com/dev/status.get
 */
export type TGetParams = {user_id: number} | {group_id: number};

export interface IGetResult {
  text: string;
  audio?: IAudio;
}

/**
 * @see https://vk.com/dev/status.set
 */
export interface ISetParams {
  text: string;
  group_id?: number;
}

export type TSetResult = 1;