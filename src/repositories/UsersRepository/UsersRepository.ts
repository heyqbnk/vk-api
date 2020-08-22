import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  GetFollowersParams,
  GetFollowersResult,
  GetParams,
  GetResult,
  GetSubscriptionsParams,
  GetSubscriptionsResult,
  ReportParams,
  ReportResult,
} from './types';
import {formatOptionalArray, formatOptionalBoolean} from '../../utils';

export class UsersRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('users', sendRequest);
  }

  /**
   * @see https://vk.com/dev/users.get
   */
  get = this.r<GetParams, GetResult>(
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
  getFollowers = this.r<GetFollowersParams, GetFollowersResult>(
    'getFollowers',
    ({fields, ...rest}) => ({
      ...rest,
      fields: formatOptionalArray(fields),
    })
  );

  /**
   * @see https://vk.com/dev/users.getSubscriptions
   */
  getSubscriptions = this.r<GetSubscriptionsParams, GetSubscriptionsResult>(
    'getSubscriptions',
    ({fields, extended, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
      fields: formatOptionalArray(fields),
    })
  );

  /**
   * @see https://vk.com/dev/users.report
   */
  report = this.r<ReportParams, ReportResult>('getSubscriptions');

  // TODO: Search
}
