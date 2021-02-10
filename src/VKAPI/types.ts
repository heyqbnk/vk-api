import {
  IRepositories,
  IRequestOptionalParams,
  TAddRepository,
  TSendRequest,
} from '../types';

export interface IVKAPIConstructorProps extends IRequestOptionalParams {
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
