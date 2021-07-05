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
   */
  checkLink = this.r<ICheckLinkParams, ICheckLinkResult>('checkLink');

  /**
   * @see https://vk.com/dev/utils.deleteFromLastShortened
   */
  deleteFromLastShortened = this.r<IDeleteFromLastShortenedParams,
    TDeleteFromLastShortenedResult>('deleteFromLastShortened');

  /**
   * @see https://vk.com/dev/utils.getLastShortenedLinks
   */
  getLastShortenedLinks = this.r<IGetLastShortenedLinksParams,
    TGetLastShortenedLinksResult>('getLastShortenedLinks');

  /**
   * @see https://vk.com/dev/utils.getLinkStats
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
   */
  getServerTime = this.r<IGetServerTimeParams, TGetServerTimeResult>(
    'getServerTime',
  );

  /**
   * @see https://vk.com/dev/utils.getShortLink
   */
  getShortLink = this.r<IGetShortLinkParams, IGetShortLinkResult>(
    'getShortLink',
    ({private: is_private, ...rest}) => ({
      ...rest,
      private: formatOptionalBoolean(is_private),
    }),
  );

  /**
   * @see https://vk.com/dev/utils.resolveScreenName
   */
  resolveScreenName =
    this.r<IResolveScreenNameParams, TResolveScreenNameResult>(
      'resolveScreenName',
    );
}
