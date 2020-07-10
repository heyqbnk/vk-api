import {RequestConfig, RequestOptionalParams, SendRequest} from '../types';
import {
  UsersRepository,
  StatsRepository,
  UtilsRepository,
  NotificationsRepository,
  MessagesRepository,
  DatabaseRepository,
  StreamingRepository, StatEventsRepository,
} from '../repositories';
import {WidgetsRepository} from '../repositories/WidgetsRepository';

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

  /**
   * States if current JS environment is browser. It will make JSONP
   * algorithm to be used
   * @default false
   */
  isBrowser?: boolean;
}

export interface VKAPIInterface {
  database: DatabaseRepository;
  messages: MessagesRepository;
  notifications: NotificationsRepository;
  statEvents: StatEventsRepository;
  stats: StatsRepository;
  streaming: StreamingRepository;
  users: UsersRepository;
  utils: UtilsRepository;
  widgets: WidgetsRepository;

  /**
   * Adds request to queue and performs it after some time
   */
  addRequestToQueue: SendRequest;
}
