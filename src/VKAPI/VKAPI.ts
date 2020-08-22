import fetch from 'isomorphic-fetch';

import {LangType, RequestConfig, SendRequest} from '../types';
import {VKAPIInterface, VKAPIConstructorProps, QueueRequest} from './types';
import {VKError} from '../VKError';
import {EventEmitter} from '../EventEmitter';
import {recursiveToCamelCase, recursiveToSnakeCase} from '../utils';
import {VKAPICore} from '../VKAPICore';

const REQUEST_PERFORMED = 'request-performed';

/**
 * Class to perform requests to VK API
 */
export class VKAPI extends VKAPICore implements VKAPIInterface {
  /**
   * Queue of requests
   * @type {QueueRequest[]}
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
   * Timeout between requests. Used to prevent over-use ban from API
   */
  private readonly timeout: number;

  /**
   * Access token to perform requests. Used in all requests until overridden
   * @type {string | null}
   */
  private readonly accessToken: string | null = null;

  /**
   * API version
   * @default '5.110'
   */
  private readonly v: string;

  /**
   * States if current environment is browser. Should be true if you
   * are using API instance on browser side to avoid problems with CORS
   * @default false
   */
  private readonly isBrowser: boolean;

  /**
   * Initially selected language. Is used in all the requests until overridden
   * @default 'ru'
   */
  private readonly lang: LangType;

  constructor(props: VKAPIConstructorProps = {}) {
    super();
    const {
      rps = 3,
      accessToken,
      v = '5.110',
      lang = 'ru',
      isBrowser = false,
    } = props;

    this.accessToken = accessToken || null;
    this.v = v;
    this.lang = lang;
    this.timeout = Math.ceil(1000 / rps);
    this.isBrowser = isBrowser;

    // Initialize repositories with specified addRequestToQueue method
    this.init(this.addRequestToQueue);
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

    // Create urlencoded form
    const form = Object
      .entries(formattedData)
      .map(([key, value]) => {
        const formattedValue = typeof value === 'object'
          ? JSON.stringify(value)
          : String(value);

        return encodeURIComponent(key) + '=' +
          encodeURIComponent(formattedValue);
      })
      .join('&');
    const url = `https://api.vk.com/method/${method}`;

    // In case, we are in browser, it is required to use JSONP
    if (this.isBrowser) {
      return new Promise(((resolve, reject) => {
        const cbName = `__vkapicallback` + Math.random().toString().slice(2);

        // Create script tag and assign source
        const script = document.createElement('script');
        script.src = `${url}?${form}&callback=${cbName}`;

        // Define JSONP callback
        (window as any)[cbName] = (data: any) => {
          // Remove script tag from DOM
          document.head.removeChild(script);

          if (data?.response) {
            return resolve(recursiveToCamelCase(data.response));
          }

          reject(new VKError(recursiveToCamelCase(data?.error || {})));
        };

        // Append script to DOM
        document.head.appendChild(script);
      }));
    }
    // Otherwise, send usual HTTP request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: form,
    });
    const json = await response.json();

    // In case, we received response, convert it to camel case
    if ('response' in json) {
      return recursiveToCamelCase(json.response);
    }

    // Otherwise, throw an error
    throw new VKError(recursiveToCamelCase(json?.error || {}));
  };

  /**
   * Processes queue of requests
   */
  private async processQueue(): Promise<void> {
    if (this.isQueueProcessing || this.queue.length === 0) {
      return;
    }
    // Set mutex value
    this.isQueueProcessing = true;

    // Create promises for each request
    const promises = this.queue.map((r, idx) => {
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
          this.eventEmitter.emit(REQUEST_PERFORMED, ref, error, data);

          // Remove request from queue
          this.queue.splice(this.queue.indexOf(r), 1);
          res();
        }, idx * this.timeout);
      });
    });

    // Add promise which should safely release queue processor and not
    // allow us to be banned
    promises.push(new Promise(res => {
      setTimeout(res, this.queue.length * this.timeout);
    }));

    // For each request create a promise with specific timeout
    await Promise.all(promises);

    // Release mutex
    this.isQueueProcessing = false;

    // Run processor again
    return this.processQueue();
  }

  addRequestToQueue: SendRequest = config => {
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
        this.eventEmitter.off(REQUEST_PERFORMED, listener);

        if (error) {
          return rej(error);
        }
        res(data);
      };

      // Add event listener
      this.eventEmitter.on(REQUEST_PERFORMED, listener);
    });

    // Run queue processor which sends requests
    this.processQueue();

    return promise;
  };
}
