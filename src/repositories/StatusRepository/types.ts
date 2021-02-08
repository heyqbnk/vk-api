import {IAudio} from '../../types/objects';

/**
 * @see https://vk.com/dev/status.get
 */
export type TGetParams = {userId: number} | {groupId: number};

export interface IGetResult {
  text: string;
  audio?: IAudio;
}

/**
 * @see https://vk.com/dev/status.set
 */
export interface ISetParams {
  text: string;
  groupId?: number;
}

export type TSetResult = 1;