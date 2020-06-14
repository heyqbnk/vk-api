import {PseudoBooleanType} from '../../types';

/**
 * @see https://vk.com/dev/notifications.markAsViewed
 */
export type MarkAsViewedResult = PseudoBooleanType;

export interface MarkAsViewedParams {
}

/**
 * @see https://vk.com/dev/notifications.sendMessage
 */
export interface SendMessageResultOk {
  userId: number;
  status: true;
}

export interface SendMessageResultError {
  userId: number;
  status: false;
  error: {
    code: number;
    description: string;
  };
}

export type SendMessageResult = Array<SendMessageResultOk | SendMessageResultError>;

export interface SendMessageParams {
  userIds: Array<string | number>;
  message: string;
  fragment?: string;
  groupId?: number;
}
