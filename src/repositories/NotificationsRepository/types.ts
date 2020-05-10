import {ProcessRequest, RequestOptionalParams} from '../../types';

export interface NotificationsRepositoryConstructorProps {
  processRequest: ProcessRequest;
}

/* MARK AS VIEWED */
export type MarkAsViewedResultType = 0 | 1;
export type MarkAsViewedMethod =
  (options?: RequestOptionalParams) => Promise<MarkAsViewedResultType>;

/* SEND MESSAGE */
interface SendMessageOptions extends RequestOptionalParams {
  userIds: Array<string | number>;
  message: string;
}

interface SendMessageResultOk {
  userId: number;
  status: true;
}

interface SendMessageResultError {
  userId: number;
  status: false;
  error: {
    code: number;
    description: string;
  };
}

export type SendMessageResultType =
  | SendMessageResultOk
  | SendMessageResultError;
export type SendMessageMethod = (options: SendMessageOptions) => Promise<SendMessageResultType[]>;

export interface NotificationsRepositoryInterface {
  // https://vk.com/dev/notifications.markAsViewed
  markAsViewed: MarkAsViewedMethod;
  // https://vk.com/dev/notifications.sendMessage
  sendMessage: SendMessageMethod;
}
