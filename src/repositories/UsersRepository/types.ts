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
  userIds: Array<string | number>;
  fields?: TUserField[];
  nameCase?: TNameCase;
}

export type TGetResult = TUser[];

/**
 * @see https://vk.com/dev/users.getFollowers
 */
export interface IGetFollowersParams {
  userId?: number;
  offset?: number;
  count?: number;
  fields?: TUserField[];
  nameCase?: TNameCase;
}

export type TGetFollowersResult = IPager<TUser>;

/**
 * @see https://vk.com/dev/users.getSubscriptions
 */
export interface IGetSubscriptionsParams {
  userId?: number;
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
  userId: number;
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
  universityCountry?: number;
  university?: number;
  universityFaculty?: number;
  universityChair?: number;
  sex?: ESex;
  status?: ERelationsStatus;
  ageFrom?: number;
  ageTo?: number;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  online?: TBoolean;
  hasPhoto?: TBoolean;
  schoolCountry?: number;
  schoolCity?: number;
  schoolClass?: number;
  school?: number;
  schoolYear?: number;
  religion?: string;
  company?: string;
  position?: string;
  groupId?: number;
  fromList?: Array<'friends' | 'subscriptions'>;
}

export type TSearchResult = IPager<TUser & { trackCode?: string }>;
