import {Repository} from '../Repository';
import {RequestOptionalParams, SendRequest} from '../../types';
import {
  IGetKeysParams, IGetMultipleKeysParams, IGetSingleKeyParams,
  ISetParams,
  TGetKeysResult, TGetMultipleKeysResult, TGetParams,
  TGetSingleKeyResult,
  TSetResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class StorageRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('storage', sendRequest);
  }

  /**
   * @see https://vk.com/dev/storage.get
   * @type {<P extends IGetSingleKeyParams | IGetMultipleKeysParams>(params: P) => Promise<P extends IGetSingleKeyParams ? TGetSingleKeyResult : TGetMultipleKeysResult>}
   */
  get = this.r('get', (
    params: RequestOptionalParams & TGetParams,
  ) => {
    if ('keys' in params) {
      const {keys, ...rest} = params;

      return {...rest, keys: formatOptionalArray(keys)};
    }
    return params;
  }) as (
    <P extends TGetParams>(params: P) => Promise<P extends IGetSingleKeyParams
      ? TGetSingleKeyResult
      : TGetMultipleKeysResult>
    );

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
