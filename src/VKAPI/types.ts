import {RequestConfig, RequestOptionalParams, SendRequest} from '../types';
import {
  UsersRepository,
  StatsRepository,
  UtilsRepository,
  NotificationsRepository,
  MessagesRepository,
  DatabaseRepository,
  StreamingRepository,
} from '../repositories';

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
  database: DatabaseRepository;
  messages: MessagesRepository;
  notifications: NotificationsRepository;
  stats: StatsRepository;
  streaming: StreamingRepository;
  users: UsersRepository;
  utils: UtilsRepository;

  /**
   * Adds request to queue and performs it after some time
   */
  addRequestToQueue: SendRequest;
}
