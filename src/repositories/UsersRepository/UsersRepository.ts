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
    ({user_ids, fields, ...rest}) => ({
      ...rest,
      user_ids: formatOptionalArray(user_ids),
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

  /**
   * @see https://vk.com/dev/users.search
   */
  search = this.r<ISearchParams, TSearchResult>(
    'search',
    ({sort, online, has_photo, ...rest}) => ({
      sort: typeof sort === 'undefined'
        ? undefined
        : (
          typeof sort === 'number'
            ? sort
            : toPseudoBoolean(sort === 'popularity')
        ),
      online: formatOptionalBoolean(online),
      has_photo: formatOptionalBoolean(has_photo),
      ...rest,
    }),
  );
}
