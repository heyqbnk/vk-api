import fetch from 'isomorphic-fetch';
import {TLang, TSendRequest} from '../types';
import {IVKAPI, IVKAPIConstructorProps} from './types';
import {VKError} from '../VKError';
import {recursiveToCamelCase, recursiveToSnakeCase} from '../utils';
import {Core} from '../Core';
import {Queue} from '../Queue';

/**
 * Class to perform requests to VK API.
 */
export class VKAPI extends Core implements IVKAPI {
  /**
   * Queue of requests.
   * @type {Queue}
   * @private
   */
  private readonly queue: Queue;
  /**
   * Access token to perform requests. Used in all requests until overridden.
   * @type {string | null}
   */
  private readonly accessToken: string | null = null;
  /**
   * API version.
   * @default '5.110'
   */
  private readonly v: string;
  /**
   * States if current environment is browser. Should be true if you
   * are using API instance on browser side to avoid problems with CORS.
   * @default false
   */
  private readonly isBrowser: boolean;
  /**
   * Initially selected language. Is used in all the requests until overridden.
   * @default 'ru'
   */
  private readonly lang: TLang;

  constructor(props: IVKAPIConstructorProps = {}) {
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
    this.isBrowser = isBrowser;
    this.queue = new Queue({timeout: Math.ceil(1000 / rps)});

    // Initialize repositories with specified addRequestToQueue method.
    this.init(this.addRequestToQueue);
  }

  /**
   * Sends request via http client.
   * @param {IRequestConfig<P>} config
   * @returns {Promise<any>}
   */
  sendRequest: TSendRequest = async config => {
    const {method, params} = config;

    // Mix data with defaults. Format body to snake case.
    const formattedData = recursiveToSnakeCase({
      v: this.v,
      accessToken: this.accessToken,
      lang: this.lang,
      ...params,
    });

    // Create urlencoded form.
    const form = Object
      .entries(formattedData)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        const formattedValue = typeof value === 'object'
          ? JSON.stringify(value)
          : String(value);

        return encodeURIComponent(key) + '=' +
          encodeURIComponent(formattedValue);
      })
      .join('&');
    const url = `https://api.vk.com/method/${method}`;

    // In case, we are in browser, it is required to use JSONP.
    if (this.isBrowser) {
      return new Promise((res, rej) => {
        const cbName = `__vkapicallback` + Math.random().toString().slice(2);

        // Create script tag and assign source.
        const script = document.createElement('script');
        script.src = `${url}?${form}&callback=${cbName}`;

        // Define JSONP callback.
        (window as any)[cbName] = (data: any) => {
          // Remove script tag from DOM.
          document.head.removeChild(script);

          if (data?.response) {
            return res(recursiveToCamelCase(data.response));
          }

          rej(new VKError({
            errorInfo: recursiveToCamelCase(data?.error || {}),
            config,
          }));
        };

        // Append script to DOM.
        document.head.appendChild(script);
      });
    }
    // Otherwise, send usual HTTP request.
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: form,
    });
    const json = await response.json();

    // In case, we received response, convert it to camel case.
    if ('response' in json) {
      return recursiveToCamelCase(json.response);
    }

    // Otherwise, throw an error.
    throw new VKError({
      errorInfo: recursiveToCamelCase(json?.error || {}),
      config,
    });
  };

  addRequestToQueue: TSendRequest = async config => {
    // Wait until request can be performed.
    await this.queue.await();

    // When awaiting is done, perform a request.
    return this.sendRequest(config);
  };
}
