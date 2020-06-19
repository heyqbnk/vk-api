import {Repository} from '../Repository';
import {RepositoryMethod, SendRequest} from '../../types';
import {
  CheckLinkParams,
  CheckLinkResult,
  DeleteFromLastShortenedParams,
  DeleteFromLastShortenedResult,
  GetLastShortenedLinksParams,
  GetLastShortenedLinksResult,
  GetLinkStatsParams,
  GetServerTimeParams,
  GetServerTimeResult,
  GetShortLinkParams,
  GetShortLinkResult, ResolveScreenNameParams, ResolveScreenNameResult,
} from './types';
import {toPseudoBoolean} from '../../utils';

/**
 * Repository to work with users
 */
export class UtilsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('utils', sendRequest);
  }

  /**
   * Creates method
   * @param {string} method
   * @param prepare
   * @returns {RepositoryMethod<P, R>}
   */
  private r<P, R>(
    method: string,
    prepare?: (params: P) => any,
  ): RepositoryMethod<P, R> {
    return params => this.sendRequest({
      method,
      params: prepare ? prepare(params) : params,
    });
  }

  /**
   * @see https://vk.com/dev/utils.checkLink
   * @type {RepositoryMethod<CheckLinkParams, CheckLinkResult>}
   */
  public checkLink = this.r<CheckLinkParams, CheckLinkResult>('checkLink');

  /**
   * @see https://vk.com/dev/utils.deleteFromLastShortened
   * @type {RepositoryMethod<DeleteFromLastShortenedParams, DeleteFromLastShortenedResult>}
   */
  public deleteFromLastShortened =
    this.r<DeleteFromLastShortenedParams, DeleteFromLastShortenedResult>(
      'deleteFromLastShortened',
    );

  /**
   * @see https://vk.com/dev/utils.getLastShortenedLinks
   * @type {RepositoryMethod<GetLastShortenedLinksParams, GetLastShortenedLinksResult>}
   */
  public getLastShortenedLinks =
    this.r<GetLastShortenedLinksParams, GetLastShortenedLinksResult>(
      'getLastShortenedLinks',
    );

  /**
   * @see https://vk.com/dev/utils.getLinkStats
   * @type {RepositoryMethod<GetLinkStatsParams, GetLastShortenedLinksResult>}
   */
  public getLinkStats = this.r<GetLinkStatsParams, GetLastShortenedLinksResult>(
    'getLinkStats',
    ({extended, ...rest}) => ({
      ...rest,
      extended: typeof extended === 'boolean'
        ? toPseudoBoolean(extended)
        : undefined,
    }),
  );

  /**
   * @see https://vk.com/dev/utils.getServerTime
   * @type {RepositoryMethod<GetServerTimeParams, GetServerTimeResult>}
   */
  public getServerTime = this.r<GetServerTimeParams, GetServerTimeResult>(
    'getServerTime',
  );

  /**
   * @see https://vk.com/dev/utils.getShortLink
   * @type {RepositoryMethod<GetShortLinkParams, GetShortLinkResult>}
   */
  public getShortLink = this.r<GetShortLinkParams, GetShortLinkResult>(
    'getShortLink',
    ({private: isPrivate, ...rest}) => ({
      ...rest,
      private: typeof isPrivate === 'boolean'
        ? toPseudoBoolean(isPrivate)
        : undefined,
    }),
  );

  /**
   * @see https://vk.com/dev/utils.resolveScreenName
   * @type {RepositoryMethod<ResolveScreenNameParams, ResolveScreenNameResult>}
   */
  public resolveScreenName =
    this.r<ResolveScreenNameParams, ResolveScreenNameResult>(
      'resolveScreenName',
    );
}