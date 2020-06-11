import {UsersRepositoryInterface} from '../repositories/UsersRepository';
import {NotificationsRepositoryInterface} from '../repositories/NotificationsRepository';
import {ProcessRequest} from '../types';
import {MessagesRepositoryInterface} from '../repositories/MessagesRepository';

export interface VKAPIConstructorProps {
  /**
   * Requests per second, API instance can perform
   */
  requestsPerSecond: number;

  /**
   * Access token which will be used for each request
   */
  accessToken?: string;

  /**
   * API version
   */
  version?: string;
}

/**
 * VKAPI class interface
 */
export interface VKAPIInterface {
  /**
   * Notifications repository
   */
  notifications: NotificationsRepositoryInterface;

  /**
   * Users repository
   */
  users: UsersRepositoryInterface;

  /**
   * Messages repository
   */
  messages: MessagesRepositoryInterface;

  /**
   * In outer context, executes a request. Internally, places a request into
   * the requests queue and executes it after it becomes available
   */
  processRequest: ProcessRequest;
}
