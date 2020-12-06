import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  IAddStickersParams,
  IAddStickersResult, IGetStickersParams, TGetStickersResult,
} from './types';

export class SpecialsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('specials', sendRequest);
  }

  /**
   * @type {(params: (IAddStickersParams & RequestOptionalParams)) => Promise<IAddStickersResult>}
   */
  addStickers = this.r<IAddStickersParams, IAddStickersResult>('addStickers');

  /**
   * @type {(params: (IGetStickersParams & RequestOptionalParams)) => Promise<Pager<{stickerId: number, isPurchased: boolean}>>}
   */
  getStickers = this.r<IGetStickersParams, TGetStickersResult>('getStickers');
}
