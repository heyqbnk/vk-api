import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {IGetParams, TGetResult} from './types';

export class GiftsRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('gifts', sendRequest);
  }

  /**
   * @see https://vk.com/dev/gifts.get
   */
  get = this.r<IGetParams, TGetResult>('get');
}
