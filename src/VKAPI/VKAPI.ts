import fetch from 'isomorphic-fetch';

import {SendRequest, ProcessRequest} from '../types';
import {VKAPIInterface, VKAPIConstructorProps} from './types';
import {RequestsQueue} from '../RequestsQueue';
import {
  UsersRepository,
  UsersRepositoryInterface,
} from '../repositories/UsersRepository';
import {
  NotificationsRepository,
  NotificationsRepositoryInterface,
} from '../repositories/NotificationsRepository';

import {recursiveToCamelCase} from './utils';
import {formatQuery} from '../utils';

/**
 * Class to perform request to VKontakte API
 */
export class VKAPI implements VKAPIInterface {
  public notifications: NotificationsRepositoryInterface;
  public users: UsersRepositoryInterface;

  /**
   * Queue of requests
   */
  private requestsQueue: RequestsQueue;

  /**
   * Access token to perform requests
   * @type {null}
   */
  private readonly accessToken: string | null = null;

  /**
   * API version
   */
  private readonly version: string;

  public constructor(props: VKAPIConstructorProps) {
    const {requestsPerSecond, accessToken, version} = props;

    this.accessToken = accessToken || null;
    this.version = version || '5.122';
    this.requestsQueue = new RequestsQueue({
      requestsPerSecond,
      sendRequest: this.sendRequest,
    });

    // Create repositories
    this.users = new UsersRepository({processRequest: this.processRequest});
    this.notifications = new NotificationsRepository({
      processRequest: this.processRequest,
    });
  }

  /**
   * In outer context, performs a request. Internally, places a request into
   * the requests queue
   * @type {{}}
   */
  public processRequest: ProcessRequest = config => {
    return this.requestsQueue.add(config);
  };

  /**
   * Executes request with http client
   */
  private sendRequest: SendRequest = async config => {
    const {method, options} = config;

    // Mix data with access token and API version. Format body to snake case
    const query = formatQuery({
      v: this.version,
      accessToken: this.accessToken,
      ...options,
    });

    // Send request
    const {json} = await fetch(`https://api.vk.com/method/${method}?` + query);
    const data = json();

    if (data.error) {
      const {errorCode, errorMsg} = recursiveToCamelCase(data.error);
      throw new Error(`${errorCode}: ${errorMsg}`);
    }

    return recursiveToCamelCase(data.response);
  };
}
