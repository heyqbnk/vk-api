import {
  ICommunity,
  IPager,
  TPseudoBoolean,
  TUser,
  TUserField,
} from '../../types';

interface ISubscription {
  ownerId: number;
  nextPaymentDate: number;
  amount: number;
  status: string;
}

/**
 * @see https://vk.com/dev/donut.getFriends
 */
export interface IGetFriendsParams {
  ownerId: number;
  offset?: number;
  count?: number;
  fields?: TUserField[];
}

export interface IGetFriendsResult extends IPager<TUser> {
}

/**
 * @see https://vk.com/dev/donut.getSubscription
 */
export interface IGetSubscriptionParams {
  ownerId: number;
}

export interface IGetSubscriptionResult extends ISubscription {
}

/**
 * @see https://vk.com/dev/donut.getSubscriptions
 */
export interface IGetSubscriptionsParams {
  fields?: TUserField[];
  offset?: number;
  count?: number;
}

export interface IGetSubscriptionsResult {
  subscriptions: ISubscription[];
  count: number;
  profiles: TUser[];
  groups: ICommunity[];
}

/**
 * @see https://vk.com/dev/donut.isDon
 */
export interface IIsDonParams {
  ownerId: number;
}

export type TIsDonResult = TPseudoBoolean;
