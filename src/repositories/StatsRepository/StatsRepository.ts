import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  TGetParams,
  IGetPostReachParams,
  IGetPostReachResult,
  TGetResult, ITrackVisitorParams, TTrackVisitorResult,
} from './types';
import {formatOptionalArray, formatOptionalBoolean} from '../../utils';

export class StatsRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('stats', sendRequest);
  }

  /**
   * @see https://vk.com/dev/stats.get
   * @type {TRepositoryMethod<TGetParams, TGetResult>}
   */
  get = this.r<TGetParams, TGetResult>(
    'get',
    ({extended, filters, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
      filters: formatOptionalArray(filters),
    }),
  );

  /**
   * @see https://vk.com/dev/stats.getPostReach
   * @type {TRepositoryMethod<IGetPostReachParams, IGetPostReachResult>}
   */
  getPostReach = this.r<IGetPostReachParams, IGetPostReachResult>(
    'getPostReach',
    ({postIds, ...rest}) => ({
      ...rest,
      postIds: formatOptionalArray(postIds),
    }),
  );

  /**
   * @see https://vk.com/dev/stats.trackVisitor
   * @type {TRepositoryMethod<ITrackVisitorParams, TTrackVisitorResult>}
   */
  trackVisitor = this.r<ITrackVisitorParams, TTrackVisitorResult>(
    'trackVisitor',
  );
}
