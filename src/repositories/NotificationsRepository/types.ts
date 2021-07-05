import {TPseudoBoolean} from '../../types';

/**
 * @see https://vk.com/dev/notifications.markAsViewed
 */
export type TMarkAsViewedResult = TPseudoBoolean;

export interface IMarkAsViewedParams {
}

/**
 * @see https://vk.com/dev/notifications.sendMessage
 */
export interface ISendMessageResultOk {
  user_id: number;
  status: true;
}

export interface ISendMessageResultError {
  user_id: number;
  status: false;
  error: {
    code: number;
    description: string;
  };
}

export type TSendMessageResult = Array<ISendMessageResultOk | ISendMessageResultError>;

export interface ISendMessageParams {
  user_ids: Array<string | number>;
  message: string;
  fragment?: string;
  group_id?: number;
}
