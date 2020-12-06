import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  IAddStickersParams,
  IAddStickersResult, IGetStickersParams, TGetStickersResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class SpecialsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('specials', sendRequest);
  }

  /**
   * @type {(params: (IAddStickersParams & RequestOptionalParams)) => Promise<IAddStickersResult>}
   */
  addStickers = this.r<IAddStickersParams, IAddStickersResult>(
    'addStickers',
    ({userIds, stickerIds, ...rest}) => ({
      ...rest,
      userIds: formatOptionalArray(userIds),
      stickerIds: formatOptionalArray(stickerIds),
    }),
  );

  /**
   * @type {(params: (IGetStickersParams & RequestOptionalParams)) => Promise<Pager<{stickerId: number, isPurchased: boolean}>>}
   */
  getStickers = this.r<IGetStickersParams, TGetStickersResult>('getStickers');
}
