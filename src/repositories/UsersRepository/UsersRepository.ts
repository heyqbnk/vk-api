import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IGetFollowersParams,
  TGetFollowersResult,
  TGetParams,
  TGetResult,
  IGetSubscriptionsParams,
  TGetSubscriptionsResult,
  IReportParams,
  TReportResult, ISearchParams, TSearchResult,
} from './types';
import {
  formatOptionalArray,
  formatOptionalBoolean,
  toPseudoBoolean,
} from '../../utils';

export class UsersRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('users', sendRequest);
  }

  /**
   * @see https://vk.com/dev/users.get
   */
  get = this.r<TGetParams, TGetResult>(
    'get',
    ({userIds, fields, ...rest}) => ({
      ...rest,
      userIds: formatOptionalArray(userIds),
      fields: formatOptionalArray(fields),
    }),
  );

  /**
   * @see https://vk.com/dev/users.getFollowers
   */
  getFollowers = this.r<IGetFollowersParams, TGetFollowersResult>(
    'getFollowers',
    ({fields, ...rest}) => ({
      ...rest,
      fields: formatOptionalArray(fields),
    }),
  );

  /**
   * @see https://vk.com/dev/users.getSubscriptions
   */
  getSubscriptions = this.r<IGetSubscriptionsParams, TGetSubscriptionsResult>(
    'getSubscriptions',
    ({fields, extended, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
      fields: formatOptionalArray(fields),
    }),
  );

  /**
   * @see https://vk.com/dev/users.report
   */
  report = this.r<IReportParams, TReportResult>('getSubscriptions');

  search = this.r<ISearchParams, TSearchResult>(
    'search',
    ({sort, online, hasPhoto, ...rest}) => ({
      sort: typeof sort === 'undefined'
        ? undefined
        : (
          typeof sort === 'number'
            ? sort
            : toPseudoBoolean(sort === 'popularity')
        ),
      online: formatOptionalBoolean(online),
      hasPhoto: formatOptionalBoolean(hasPhoto),
      ...rest
    }),
  );
}
