import {
  IRepositories,
  TAddRepository, TLang,
  TSendRequest,
} from '../types';

export interface IVKAPIConstructorProps {
  /**
   * Requests per second instance can perform. Required to prevent block from
   * VK API.
   * @default 3
   */
  rps?: number;
  /**
   * States if current JS environment is browser. It will make JSONP
   * algorithm to be used.
   * @default false
   */
  isBrowser?: boolean;
  /**
   * API URL.
   * @default "https://api.vk.com/method"
   */
  baseUrl?: string;
  /**
   * Access token.
   */
  accessToken?: string;
  /**
   * Language.
   * @default "ru"
   */
  lang?: TLang;
  /**
   * API version.
   * @default "5.110"
   */
  v?: string;
}

export interface IVKAPI extends IRepositories {
  /**
   * Adds request to queue and performs it after client is available.
   */
  addRequestToQueue: TSendRequest;
  /**
   * Sends request ignoring requests per second property.
   */
  sendRequest: TSendRequest;
  /**
   * Adds new repository.
   */
  addRepository: TAddRepository<this>;
}
