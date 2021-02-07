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
   * @type {(params: (IGetFriendsParams & IRequestOptionalParams)) => Promise<IGetFriendsResult>}
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
   * @type {(params: (IGetSubscriptionParams & IRequestOptionalParams)) => Promise<IGetSubscriptionResult>}
   */
  getSubscription = this.r<IGetSubscriptionParams, IGetSubscriptionResult>(
    'getSubscription',
  );

  /**
   * @see https://vk.com/dev/donut.getSubscriptions
   * @type {(params: (IGetSubscriptionsParams & IRequestOptionalParams)) => Promise<IGetSubscriptionsResult>}
   */
  getSubscriptions = this.r<IGetSubscriptionsParams, IGetSubscriptionsResult>(
    'getSubscriptions',
  );

  /**
   * @see https://vk.com/dev/donut.isDon
   * @type {(params: (IIsDonParams & IRequestOptionalParams)) => Promise<0 | 1>}
   */
  isDon = this.r<IIsDonParams, TIsDonResult>('isDon');
}
