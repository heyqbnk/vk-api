import {
  TBoolean,
  IPager,
  ERelationsStatus,
  ESex,
  TUser,
  TUserField,
  TNameCase,
} from '../../types';

/**
 * @see https://vk.com/dev/users.get
 */
export interface TGetParams {
  user_ids: Array<string | number>;
  fields?: TUserField[];
  name_case?: TNameCase;
}

export type TGetResult = TUser[];

/**
 * @see https://vk.com/dev/users.getFollowers
 */
export interface IGetFollowersParams {
  user_id?: number;
  offset?: number;
  count?: number;
  fields?: TUserField[];
  name_case?: TNameCase;
}

export type TGetFollowersResult = IPager<TUser>;

/**
 * @see https://vk.com/dev/users.getSubscriptions
 */
export interface IGetSubscriptionsParams {
  user_id?: number;
  extended?: TBoolean;
  offset?: number;
  count?: number;
  fields?: TUserField[];
}

export type TGetSubscriptionsResult = IPager<TUser>;

/**
 * @see https://vk.com/dev/users.report
 */
export interface IReportParams {
  user_id: number;
  type: 'porn' | 'spam' | 'insult' | 'advertisеment';
  comment: string;
}

export type TReportResult = 1;

/**
 * @see https://vk.com/dev/users.search
 * // TODO: Adapt for easier usage
 */
export interface ISearchParams {
  q?: string;
  sort?: 0 | 1 | 'popularity' | 'registration-date';
  offset?: number;
  count?: number;
  fields?: TUserField[];
  city?: number;
  country?: number;
  hometown?: string;
  university_country?: number;
  university?: number;
  university_faculty?: number;
  university_chair?: number;
  sex?: ESex;
  status?: ERelationsStatus;
  age_from?: number;
  age_to?: number;
  birth_day?: number;
  birth_month?: number;
  birth_year?: number;
  online?: TBoolean;
  has_photo?: TBoolean;
  school_country?: number;
  school_city?: number;
  school_class?: number;
  school?: number;
  school_year?: number;
  religion?: string;
  company?: string;
  position?: string;
  group_id?: number;
  from_list?: Array<'friends' | 'subscriptions'>;
}

export type TSearchResult = IPager<TUser & { trackCode?: string }>;
