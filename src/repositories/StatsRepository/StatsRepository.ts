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
   */
  getPostReach = this.r<IGetPostReachParams, IGetPostReachResult>(
    'getPostReach',
    ({post_ids, ...rest}) => ({
      ...rest,
      post_ids: formatOptionalArray(post_ids),
    }),
  );

  /**
   * @see https://vk.com/dev/stats.trackVisitor
   */
  trackVisitor = this.r<ITrackVisitorParams, TTrackVisitorResult>(
    'trackVisitor',
  );
}
