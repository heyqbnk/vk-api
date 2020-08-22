import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  GetParams,
  GetPostReachParams,
  GetPostReachResult,
  GetResult, TrackVisitorParams, TrackVisitorResult,
} from './types';
import {formatOptionalArray, formatOptionalBoolean} from '../../utils';

export class StatsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('stats', sendRequest);
  }

  /**
   * @see https://vk.com/dev/stats.get
   * @type {RepositoryMethod<GetParams, GetResult>}
   */
  get = this.r<GetParams, GetResult>(
    'get',
    ({extended, filters, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
      filters: formatOptionalArray(filters),
    }),
  );

  /**
   * @see https://vk.com/dev/stats.getPostReach
   * @type {RepositoryMethod<GetPostReachParams, GetPostReachResult>}
   */
  getPostReach = this.r<GetPostReachParams, GetPostReachResult>(
    'getPostReach',
    ({postIds, ...rest}) => ({
      ...rest,
      postIds: formatOptionalArray(postIds),
    }),
  );

  /**
   * @see https://vk.com/dev/stats.trackVisitor
   * @type {RepositoryMethod<TrackVisitorParams, TrackVisitorResult>}
   */
  trackVisitor = this.r<TrackVisitorParams, TrackVisitorResult>(
    'trackVisitor',
  );
}
