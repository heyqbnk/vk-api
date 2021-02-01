import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  ICheckLinkParams,
  ICheckLinkResult,
  IDeleteFromLastShortenedParams,
  TDeleteFromLastShortenedResult,
  IGetLastShortenedLinksParams,
  TGetLastShortenedLinksResult,
  IGetLinkStatsParams, IGetLinkStatsResult,
  IGetServerTimeParams,
  TGetServerTimeResult,
  IGetShortLinkParams,
  IGetShortLinkResult,
  IResolveScreenNameParams,
  TResolveScreenNameResult,
} from './types';
import {formatOptionalBoolean} from '../../utils';

export class UtilsRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('utils', sendRequest);
  }

  /**
   * @see https://vk.com/dev/utils.checkLink
   * @type {TRepositoryMethod<ICheckLinkParams, ICheckLinkResult>}
   */
  checkLink = this.r<ICheckLinkParams, ICheckLinkResult>('checkLink');

  /**
   * @see https://vk.com/dev/utils.deleteFromLastShortened
   * @type {TRepositoryMethod<IDeleteFromLastShortenedParams, TDeleteFromLastShortenedResult>}
   */
  deleteFromLastShortened = this.r<IDeleteFromLastShortenedParams,
    TDeleteFromLastShortenedResult>('deleteFromLastShortened');

  /**
   * @see https://vk.com/dev/utils.getLastShortenedLinks
   * @type {TRepositoryMethod<IGetLastShortenedLinksParams, TGetLastShortenedLinksResult>}
   */
  getLastShortenedLinks = this.r<IGetLastShortenedLinksParams,
    TGetLastShortenedLinksResult>('getLastShortenedLinks');

  /**
   * @see https://vk.com/dev/utils.getLinkStats
   * @type {TRepositoryMethod<IGetLinkStatsParams, TGetLastShortenedLinksResult>}
   */
  getLinkStats = this.r<IGetLinkStatsParams, IGetLinkStatsResult>(
    'getLinkStats',
    ({extended, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
    }),
  );

  /**
   * @see https://vk.com/dev/utils.getServerTime
   * @type {TRepositoryMethod<IGetServerTimeParams, TGetServerTimeResult>}
   */
  getServerTime = this.r<IGetServerTimeParams, TGetServerTimeResult>(
    'getServerTime',
  );

  /**
   * @see https://vk.com/dev/utils.getShortLink
   * @type {TRepositoryMethod<IGetShortLinkParams, IGetShortLinkResult>}
   */
  getShortLink = this.r<IGetShortLinkParams, IGetShortLinkResult>(
    'getShortLink',
    ({private: isPrivate, ...rest}) => ({
      ...rest,
      private: formatOptionalBoolean(isPrivate),
    }),
  );

  /**
   * @see https://vk.com/dev/utils.resolveScreenName
   * @type {TRepositoryMethod<IResolveScreenNameParams, TResolveScreenNameResult>}
   */
  resolveScreenName =
    this.r<IResolveScreenNameParams, TResolveScreenNameResult>(
      'resolveScreenName',
    );
}
