import {Repository} from '../Repository';
import {IRequestOptionalParams, TSendRequest} from '../../types';
import {
  IGetKeysParams,
  ISetParams,
  TGetKeysResult, TGetParams, TGetResult,
  TSetResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class StorageRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('storage', sendRequest);
  }

  /**
   * @see https://vk.com/dev/storage.get
   */
  get = this.r<TGetParams, TGetResult>('get',
    (params: IRequestOptionalParams & TGetParams) => {
      if ('keys' in params) {
        const {keys, ...rest} = params;

        return {...rest, keys: formatOptionalArray(keys)};
      }
      return params;
    },
  );

  /**
   * @see https://vk.com/dev/storage.getKeys
   */
  getKeys = this.r<IGetKeysParams, TGetKeysResult>('getKeys');

  /**
   * @see https://vk.com/dev/storage.set
   */
  set = this.r<ISetParams, TSetResult>('set');
}
