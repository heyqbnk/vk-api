import fetch from 'isomorphic-fetch';
import {TAddRepository, TLang, TSendRequest} from '../types';
import {IVKAPI, IVKAPIConstructorProps} from './types';
import {Core} from '../Core';
import {Queue} from '../Queue';
import {validateResponse} from './utils';

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
  readonly baseUrl: string;

  constructor(props: IVKAPIConstructorProps = {}) {
    super();
    const {
      rps = 3,
      accessToken,
      v = '5.110',
      lang = 'ru',
      isBrowser = false,
      baseUrl = 'https://api.vk.com',
    } = props;

    this.accessToken = accessToken || null;
    this.v = v;
    this.lang = lang;
    this.isBrowser = isBrowser;
    this.queue = new Queue({timeout: Math.ceil(1000 / rps)});
    this.baseUrl = baseUrl.endsWith('/')
      ? baseUrl.slice(0, baseUrl.length - 1)
      : baseUrl;

    // Initialize repositories with specified addRequestToQueue method.
    this.init(this.addRequestToQueue);
  }

  sendRequest: TSendRequest = async config => {
    const {method, params, format = response => response} = config;

    // Mix data with defaults.
    const fullParams = {
      v: this.v,
      access_token: this.accessToken,
      lang: this.lang,
      ...params,
    };

    // Create urlencoded form.
    const form = Object
      .entries(fullParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        const formattedValue = typeof value === 'object'
          ? JSON.stringify(value)
          : String(value);

        return encodeURIComponent(key) + '=' +
          encodeURIComponent(formattedValue);
      })
      .join('&');
    const url = `${this.baseUrl}/method/${method}`;

    // In case, we are in browser, it is required to use JSONP.
    if (this.isBrowser) {
      return new Promise((res, rej) => {
        const cbName = `__vkapicallback` + Math.random().toString().slice(2);

        // Create script tag and assign source.
        const script = document.createElement('script');
        script.src = `${url}?${form}&callback=${cbName}`;

        // Define JSONP callback.
        (window as any)[cbName] = (data: unknown) => {
          // Remove script tag from DOM.
          document.head.removeChild(script);

          try {
            res(format(validateResponse(data, config), fullParams));
          } catch (e) {
            rej(e);
          }
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
    if (!response.ok) {
      throw new Error(
        `Unsuccessful response: ${response.status}. ${response.statusText}`,
      );
    }
    let json: unknown;

    try {
      json = await response.json();
    } catch (e) {
      throw new Error('Response from server was not JSON');
    }
    return format(validateResponse(json, config), fullParams);
  };

  addRequestToQueue: TSendRequest = async config => {
    // Wait until request can be performed.
    await this.queue.await();

    // When awaiting is done, perform a request.
    return this.sendRequest(config);
  };

  addRepository: TAddRepository<this> = (name, Repo) => {
    return super.addRepository(name, Repo, this.addRequestToQueue);
  }
}
