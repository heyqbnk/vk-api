import {RequestConfig, RequestOptionalParams, SendRequest} from '../types';
import {UsersRepository} from '../repositories/UsersRepository';
import {MessagesRepository} from '../repositories/MessagesRepository';
import {NotificationsRepository} from '../repositories/NotificationsRepository';

export interface QueueRequest {
  /**
   * Request config
   */
  config: RequestConfig;

  /**
   * Reference required to detect which request was performed
   */
  ref: symbol;
}

export interface VKAPIConstructorProps extends RequestOptionalParams {
  /**
   * Requests per second instance can perform. Required to prevent block from
   * VKontakte API
   * @default 3
   */
  rps?: number;
}

export interface VKAPIInterface {
  users: UsersRepository;
  messages: MessagesRepository;
  notifications: NotificationsRepository;

  /**
   * Adds request to queue and performs it after some time
   */
  addRequestToQueue: SendRequest;
}
