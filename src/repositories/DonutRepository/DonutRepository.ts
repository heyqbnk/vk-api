import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IGetFriendsParams,
  IGetFriendsResult,
  IGetSubscriptionParams,
  IGetSubscriptionResult,
  IGetSubscriptionsParams,
  IGetSubscriptionsResult,
  IIsDonParams,
  TIsDonResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class DonutRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('donut', sendRequest);
  }

  /**
   * @see https://vk.com/dev/donut.getFriends
   */
  getFriends = this.r<IGetFriendsParams, IGetFriendsResult>(
    'getFriends',
    ({fields, ...rest}) => ({
      ...rest,
      fields: formatOptionalArray(fields),
    }),
  );

  /**
   * @see https://vk.com/dev/donut.getSubscription
   */
  getSubscription = this.r<IGetSubscriptionParams, IGetSubscriptionResult>(
    'getSubscription',
  );

  /**
   * @see https://vk.com/dev/donut.getSubscriptions
   */
  getSubscriptions = this.r<IGetSubscriptionsParams, IGetSubscriptionsResult>(
    'getSubscriptions',
  );

  /**
   * @see https://vk.com/dev/donut.isDon
   */
  isDon = this.r<IIsDonParams, TIsDonResult>('isDon');
}
