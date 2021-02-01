import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IAddStickersParams,
  TAddStickersResult, IGetStickersParams, TGetStickersResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class SpecialsRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('specials', sendRequest);
  }

  /**
   * @type {(params: (IAddStickersParams & IRequestOptionalParams)) => Promise<IAddStickersResult>}
   */
  addStickers = this.r<IAddStickersParams, TAddStickersResult>(
    'addStickers',
    ({userIds, stickerIds, ...rest}) => ({
      ...rest,
      userIds: formatOptionalArray(userIds),
      stickerIds: formatOptionalArray(stickerIds),
    }),
  );

  /**
   * @type {(params: (IGetStickersParams & IRequestOptionalParams)) => Promise<IPager<{stickerId: number, isPurchased: boolean}>>}
   */
  getStickers = this.r<IGetStickersParams, TGetStickersResult>('getStickers');
}
