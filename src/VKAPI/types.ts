import {RequestConfig, RequestOptionalParams, SendRequest} from '../types';
import {
  UsersRepository,
  StatsRepository,
  UtilsRepository,
  NotificationsRepository,
  MessagesRepository,
  DatabaseRepository,
  StreamingRepository, StatEventsRepository,
  WidgetsRepository, SpecialsRepository,
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
   * VK, API
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

export interface VKAPIRepositories {
  database: DatabaseRepository;
  messages: MessagesRepository;
  notifications: NotificationsRepository;
  specials: SpecialsRepository;
  statEvents: StatEventsRepository;
  stats: StatsRepository;
  streaming: StreamingRepository;
  users: UsersRepository;
  utils: UtilsRepository;
  widgets: WidgetsRepository;
}

export interface VKAPIInterface extends VKAPIRepositories {
  /**
   * Adds request to queue and performs it after client is available to do it
   */
  addRequestToQueue: SendRequest;
}
