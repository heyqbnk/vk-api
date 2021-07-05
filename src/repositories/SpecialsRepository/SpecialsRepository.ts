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

  addStickers = this.r<IAddStickersParams, TAddStickersResult>(
    'addStickers',
    ({user_ids, sticker_ids, ...rest}) => ({
      ...rest,
      user_ids: formatOptionalArray(user_ids),
      sticker_ids: formatOptionalArray(sticker_ids),
    }),
  );

  getStickers = this.r<IGetStickersParams, TGetStickersResult>('getStickers');
}
