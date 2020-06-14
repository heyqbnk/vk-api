import fetch from 'isomorphic-fetch';

import {LangType, RequestConfig, SendRequest} from '../types';
import {VKAPIInterface, VKAPIConstructorProps, QueueRequest} from './types';
import {VKError} from '../VKError';
import {EventEmitter} from '../EventEmitter';
import {recursiveToCamelCase, recursiveToSnakeCase} from '../utils';
import {
  UsersRepository,
  MessagesRepository,
  NotificationsRepository,
} from '../repositories';

/**
 * Class to perform request to VKontakte API
 */
export class VKAPI implements VKAPIInterface {
  public users: UsersRepository;
  public messages: MessagesRepository;
  public notifications: NotificationsRepository;

  /**
   * Queue of requests
   * @type {any[]}
   */
  private readonly queue: QueueRequest[] = [];

  /**
   * Mutex which states if queue is currently processing
   * @type {boolean}
   */
  private isQueueProcessing = false;

  /**
   * Event emitter which notifies about completed requests
   * @type {EventEmitter}
   */
  private eventEmitter = new EventEmitter();

  /**
   * Timeout between requests
   */
  private readonly timeout: number;

  /**
   * Access token to perform requests
   * @type {string | null}
   */
  private readonly accessToken: string | null = null;

  /**
   * API version
   */
  private readonly v: string;

  /**
   * Language
   */
  private readonly lang: LangType;

  public constructor(props: VKAPIConstructorProps = {}) {
    const {
      rps = 3,
      accessToken,
      v = '5.110',
      lang = 'ru',
    } = props;

    this.accessToken = accessToken || null;
    this.v = v;
    this.lang = lang;
    this.timeout = Math.ceil(1000 / rps);

    this.users = new UsersRepository(this.addRequestToQueue);
    this.messages = new MessagesRepository(this.addRequestToQueue);
    this.notifications = new NotificationsRepository(this.addRequestToQueue);
  }

  /**
   * Sends request via http client
   */
  private sendRequest = async (config: RequestConfig) => {
    const {method, params} = config;

    // Mix data with defaults. Format body to snake case
    const formattedData = recursiveToSnakeCase({
      v: this.v,
      accessToken: this.accessToken,
      lang: this.lang,
      ...params,
    });

    // Create FormData from formatted data
    const form = Object
      .keys(formattedData)
      .map(k => encodeURIComponent(k) + '=' +
        encodeURIComponent(formattedData[k]))
      .join('&');

    // Send request
    const response = await fetch(`https://api.vk.com/method/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: form,
    });
    const json = await response.json();

    if (json.error) {
      throw new VKError(recursiveToCamelCase(json.error));
    }

    return recursiveToCamelCase(json.response);
  };

  /**
   * Processes queue of requests
   */
  private async processQueue() {
    if (this.isQueueProcessing || this.queue.length === 0) {
      return;
    }
    // Set mutex value
    this.isQueueProcessing = true;

    // For each request create a promise with specific timeout
    await Promise.all(
      this.queue.map((r, idx) => {
        return new Promise(res => {
          setTimeout(async () => {
            const {config, ref} = r;
            let error: Error | null = null;
            let data: any = null;

            try {
              // Execute request
              data = await this.sendRequest(config);
            } catch (e) {
              error = e;
            }
            // Emit event that request was performed
            this.eventEmitter.emit('request-performed', ref, error, data);

            // Remove request from queue
            this.queue.splice(this.queue.indexOf(r), 1);
            res();
          }, idx * this.timeout);
        });
      }),
    );

    // Release mutex
    this.isQueueProcessing = false;

    // Run processor again
    this.processQueue();
  }

  public addRequestToQueue: SendRequest = config => {
    // Create reference to detect request is performed. Reference is unique
    // request identifier
    const ref = Symbol();

    // Push request to queue
    this.queue.push({config, ref});

    // Create promise which waits for request to be executed
    const promise = new Promise<any>((res, rej) => {
      // Create event emitter listener
      const listener = (reference: symbol, error: Error | null, data: any) => {
        // Skip different references
        if (ref !== reference) {
          return;
        }
        // Remove event listener due to request was performed
        this.eventEmitter.off('request-performed', listener);

        if (error) {
          return rej(error);
        }
        res(data);
      };

      // Add event listener
      this.eventEmitter.on('request-performed', listener);
    });

    // Run queue processor which sends requests
    this.processQueue();

    return promise;
  };
}
