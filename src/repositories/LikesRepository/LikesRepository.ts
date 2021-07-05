import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IDeleteResult,
  IAddParams,
  IAddResult,
  IDeleteParams,
  IGetListParams,
  IGetListResult,
  IIsLikedParams,
  IIsLikedResult,
} from './types';
import {formatOptionalBoolean} from '../../utils';

export class LikesRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('likes', sendRequest);
  }

  /**
   * https://vk.com/dev/likes.add
   */
  add = this.r<IAddParams, IAddResult>('add');

  /**
   * @see https://vk.com/dev/likes.delete
   */
  delete = this.r<IDeleteParams, IDeleteResult>('delete');

  /**
   * @see https://vk.com/dev/likes.getList
   */
  getList = this.r<IGetListParams, IGetListResult>(
    'getList',
    ({friends_only, extended, skip_own, ...rest}) => ({
      friends_only: formatOptionalBoolean(friends_only),
      extended: formatOptionalBoolean(extended),
      skip_own: formatOptionalBoolean(skip_own),
      ...rest,
    }),
  );

  /**
   * @see https://vk.com/dev/likes.isLiked
   */
  isLiked = this.r<IIsLikedParams, IIsLikedResult>('isLiked');
}
