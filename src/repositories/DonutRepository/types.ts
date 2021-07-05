import {
  ICommunity,
  IPager,
  TPseudoBoolean,
  TUser,
  TUserField,
} from '../../types';

interface ISubscription {
  owner_id: number;
  next_payment_date: number;
  amount: number;
  status: string;
}

/**
 * @see https://vk.com/dev/donut.getFriends
 */
export interface IGetFriendsParams {
  owner_id: number;
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
  owner_id: number;
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
  owner_id: number;
}

export type TIsDonResult = TPseudoBoolean;
