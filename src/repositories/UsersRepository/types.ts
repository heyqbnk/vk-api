import {
  BooleanType,
  Pager,
  RelationsStatusEnum,
  SexEnum,
  User,
} from '../../types';

export type NameCaseType = 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'abl';
export type UserFieldType =
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
export interface GetParams {
  userIds: Array<string | number>;
  fields?: UserFieldType[];
  nameCase?: NameCaseType;
}

export type GetResult = User[];

/**
 * @see https://vk.com/dev/users.getFollowers
 */
export interface GetFollowersParams {
  userId?: number;
  offset?: number;
  count?: number;
  fields?: UserFieldType[];
  nameCase?: NameCaseType;
}

export type GetFollowersResult = Pager<User>;

/**
 * @see https://vk.com/dev/users.getSubscriptions
 */
export interface GetSubscriptionsParams {
  userId?: number;
  extended?: BooleanType;
  offset?: number;
  count?: number;
  fields?: UserFieldType[];
}

export type GetSubscriptionsResult = Pager<User>;

/**
 * @see https://vk.com/dev/users.report
 */
export interface ReportParams {
  userId: number;
  type: 'porn' | 'spam' | 'insult' | 'advertisеment';
  comment: string;
}

export type ReportResult = 1;

/**
 * @see https://vk.com/dev/users.search
 * // TODO: Adapt for easier usage
 */
export interface SearchParams {
  q?: string;
  sort?: 0 | 1 | 'popularity' | 'registration-date';
  offset?: number;
  count?: number;
  fields?: UserFieldType[];
  city?: number;
  country?: number;
  hometown?: string;
  universityCountry?: number;
  university?: number;
  universityFaculty?: number;
  universityChair?: number;
  sex?: SexEnum;
  status?: RelationsStatusEnum;
  ageFrom?: number;
  ageTo?: number;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  online?: BooleanType;
  hasPhoto?: BooleanType;
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

export type SearchResult = Pager<User & { trackCode?: string }>;
