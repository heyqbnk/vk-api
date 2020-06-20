import {Repository} from '../Repository';
import {RepositoryMethod, SendRequest} from '../../types';
import {
  GetParams,
  GetPostReachParams,
  GetPostReachResult,
  GetResult, TrackVisitorParams, TrackVisitorResult,
} from './types';
import {toPseudoBoolean} from '../../utils';

/**
 * Repository to work with users
 */
export class StatsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('stats', sendRequest);
  }

  /**
   * @see https://vk.com/dev/stats.get
   * @type {RepositoryMethod<GetParams, GetResult>}
   */
  public get = this.r<GetParams, GetResult>(
    'get',
    ({extended, filters, ...rest}) => ({
      ...rest,
      extended: typeof extended === 'boolean'
        ? toPseudoBoolean(extended)
        : undefined,
      filters: Array.isArray(filters) ? filters.join(',') : undefined,
    }),
  );

  /**
   * @see https://vk.com/dev/stats.getPostReach
   * @type {RepositoryMethod<GetPostReachParams, GetPostReachResult>}
   */
  public getPostReach = this.r<GetPostReachParams, GetPostReachResult>(
    'getPostReach',
    ({postIds, ...rest}) => ({
      ...rest,
      postIds: Array.isArray(postIds) ? postIds.join(',') : undefined,
    }),
  );

  /**
   * @see https://vk.com/dev/stats.trackVisitor
   * @type {RepositoryMethod<TrackVisitorParams, TrackVisitorResult>}
   */
  public trackVisitor = this.r<TrackVisitorParams, TrackVisitorResult>(
    'trackVisitor'
  );
}
