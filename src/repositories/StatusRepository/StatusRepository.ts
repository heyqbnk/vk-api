import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {IGetResult, TSetResult, ISetParams, TGetParams} from './types';

export class StatusRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('status', sendRequest);
  }

  /**
   * @see https://vk.com/dev/status.get
   * @type {(params: (({userId: number} & IRequestOptionalParams) | ({groupId: number} & IRequestOptionalParams))) => Promise<IGetResult>}
   */
  get = this.r<TGetParams, IGetResult>('get');

  /**
   * @see https://vk.com/dev/status.set
   * @type {(params: (ISetParams & IRequestOptionalParams)) => Promise<1>}
   */
  set = this.r<ISetParams, TSetResult>('set');
}
