import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  CheckLinkParams,
  CheckLinkResult,
  DeleteFromLastShortenedParams,
  DeleteFromLastShortenedResult,
  GetLastShortenedLinksParams,
  GetLastShortenedLinksResult,
  GetLinkStatsParams, GetLinkStatsResult,
  GetServerTimeParams,
  GetServerTimeResult,
  GetShortLinkParams,
  GetShortLinkResult,
  ResolveScreenNameParams,
  ResolveScreenNameResult,
} from './types';
import {formatOptionalBoolean} from '../../utils';

export class UtilsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('utils', sendRequest);
  }

  /**
   * @see https://vk.com/dev/utils.checkLink
   * @type {RepositoryMethod<CheckLinkParams, CheckLinkResult>}
   */
  checkLink = this.r<CheckLinkParams, CheckLinkResult>('checkLink');

  /**
   * @see https://vk.com/dev/utils.deleteFromLastShortened
   * @type {RepositoryMethod<DeleteFromLastShortenedParams, DeleteFromLastShortenedResult>}
   */
  deleteFromLastShortened = this.r<DeleteFromLastShortenedParams,
    DeleteFromLastShortenedResult>('deleteFromLastShortened');

  /**
   * @see https://vk.com/dev/utils.getLastShortenedLinks
   * @type {RepositoryMethod<GetLastShortenedLinksParams, GetLastShortenedLinksResult>}
   */
  getLastShortenedLinks = this.r<GetLastShortenedLinksParams,
    GetLastShortenedLinksResult>('getLastShortenedLinks');

  /**
   * @see https://vk.com/dev/utils.getLinkStats
   * @type {RepositoryMethod<GetLinkStatsParams, GetLastShortenedLinksResult>}
   */
  getLinkStats = this.r<GetLinkStatsParams, GetLinkStatsResult>(
    'getLinkStats',
    ({extended, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
    }),
  );

  /**
   * @see https://vk.com/dev/utils.getServerTime
   * @type {RepositoryMethod<GetServerTimeParams, GetServerTimeResult>}
   */
  getServerTime = this.r<GetServerTimeParams, GetServerTimeResult>(
    'getServerTime',
  );

  /**
   * @see https://vk.com/dev/utils.getShortLink
   * @type {RepositoryMethod<GetShortLinkParams, GetShortLinkResult>}
   */
  getShortLink = this.r<GetShortLinkParams, GetShortLinkResult>(
    'getShortLink',
    ({private: isPrivate, ...rest}) => ({
      ...rest,
      private: formatOptionalBoolean(isPrivate),
    }),
  );

  /**
   * @see https://vk.com/dev/utils.resolveScreenName
   * @type {RepositoryMethod<ResolveScreenNameParams, ResolveScreenNameResult>}
   */
  resolveScreenName =
    this.r<ResolveScreenNameParams, ResolveScreenNameResult>(
      'resolveScreenName',
    );
}
