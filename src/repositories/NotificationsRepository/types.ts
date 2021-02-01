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
  userId: number;
  status: true;
}

export interface ISendMessageResultError {
  userId: number;
  status: false;
  error: {
    code: number;
    description: string;
  };
}

export type TSendMessageResult = Array<ISendMessageResultOk | ISendMessageResultError>;

export interface ISendMessageParams {
  userIds: Array<string | number>;
  message: string;
  fragment?: string;
  groupId?: number;
}
