import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  IGetKeysParams,
  ISetParams,
  TGetKeysResult,
  TGetParams,
  TGetResult,
  TSetResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class StorageRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('storage', sendRequest);
  }

  /**
   * @see https://vk.com/dev/storage.get
   * @type {(params: (({userId?: number} & {key: string} & RequestOptionalParams) | ({userId?: number} & {keys: string[]} & RequestOptionalParams))) => Promise<{key: string, value: string}[]>}
   */
  get = this.r<TGetParams, TGetResult>('get', params => {
    if ('keys' in params) {
      const {keys, ...rest} = params;

      return {
        ...rest,
        keys: formatOptionalArray(keys),
      };
    }
    return params;
  });

  /**
   * @see https://vk.com/dev/storage.getKeys
   * @type {(params: (IGetKeysParams & RequestOptionalParams)) => Promise<string[]>}
   */
  getKeys = this.r<IGetKeysParams, TGetKeysResult>('getKeys');

  /**
   * @see https://vk.com/dev/storage.set
   * @type {(params: (ISetParams & RequestOptionalParams)) => Promise<1>}
   */
  set = this.r<ISetParams, TSetResult>('set');
}
