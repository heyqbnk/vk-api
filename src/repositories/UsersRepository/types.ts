import {
  TBoolean,
  IPager,
  ERelationsStatus,
  ESex,
  TUser,
} from '../../types';

export type TNameCase = 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'abl';
export type TUserField =
  | 'about'
  | 'activities'
  | 'bdate'
  | 'blacklisted'
  | 'books'
  | 'can_post'
  | 'can_see_all_posts'
  | 'can_see_audio'
  | 'can_send_friend_request'
  | 'can_write_private_message'
  | 'career'
  | 'city'
  | 'common_count'
  | 'connections'
  | 'contacts'
  | 'counters'
  | 'country'
  | 'crop_photo'
  | 'domain'
  | 'education'
  | 'first_name_nom'
  | 'first_name_gen'
  | 'first_name_dat'
  | 'first_name_acc'
  | 'first_name_ins'
  | 'first_name_abl'
  | 'followers_count'
  | 'friend_status'
  | 'games'
  | 'has_mobile'
  | 'has_photo'
  | 'home_town'
  | 'interests'
  | 'is_favorite'
  | 'is_friend'
  | 'is_hidden_from_feed'
  | 'last_name_nom'
  | 'last_name_gen'
  | 'last_name_dat'
  | 'last_name_acc'
  | 'last_name_ins'
  | 'last_name_abl'
  | 'last_seen'
  | 'lists'
  | 'maiden_name'
  | 'military'
  | 'movies'
  | 'music'
  | 'nickname'
  | 'occupation'
  | 'online'
  | 'personal'
  | 'photo_50'
  | 'photo_100'
  | 'photo_200_orig'
  | 'photo_200'
  | 'photo_400_orig'
  | 'photo_id'
  | 'photo_max'
  | 'photo_max_orig'
  | 'quotes'
  | 'relatives'
  | 'relation'
  | 'schools'
  | 'screen_name'
  | 'sex'
  | 'site'
  | 'status'
  | 'timezone'
  | 'trending'
  | 'tv'
  | 'universities'
  | 'verified'
  | 'wall_default'

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
