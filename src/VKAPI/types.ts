import {UsersRepositoryInterface} from '../repositories/UsersRepository';
import {NotificationsRepositoryInterface} from '../repositories/NotificationsRepository';

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
  notifications: NotificationsRepositoryInterface;
  users: UsersRepositoryInterface;
}
