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
   * @type {(params: (IAddParams & IRequestOptionalParams)) => Promise<IAddResult>}
   */
  add = this.r<IAddParams, IAddResult>('add');

  /**
   * @see https://vk.com/dev/likes.delete
   * @type {(params: (IDeleteParams & IRequestOptionalParams)) => Promise<IDeleteResult>}
   */
  delete = this.r<IDeleteParams, IDeleteResult>('delete');

  /**
   * @see https://vk.com/dev/likes.getList
   * @type {(params: (IGetListParams & IRequestOptionalParams)) => Promise<IGetListResult>}
   */
  getList = this.r<IGetListParams, IGetListResult>(
    'getList',
    ({friendsOnly, extended, skipOwn, ...rest}) => ({
      friendsOnly: formatOptionalBoolean(friendsOnly),
      extended: formatOptionalBoolean(extended),
      skipOwn: formatOptionalBoolean(skipOwn),
      ...rest,
    }),
  );

  /**
   * @see https://vk.com/dev/likes.isLiked
   * @type {(params: (IIsLikedParams & IRequestOptionalParams)) => Promise<IIsLikedResult>}
   */
  isLiked = this.r<IIsLikedParams, IIsLikedResult>('isLiked');
}
