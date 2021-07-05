import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {IGetResult, TSetResult, ISetParams, TGetParams} from './types';

export class StatusRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('status', sendRequest);
  }

  /**
   * @see https://vk.com/dev/status.get
   */
  get = this.r<TGetParams, IGetResult>('get');

  /**
   * @see https://vk.com/dev/status.set
   */
  set = this.r<ISetParams, TSetResult>('set');
}
