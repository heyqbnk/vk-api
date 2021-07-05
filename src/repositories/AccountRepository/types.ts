import {
  ERelationsStatus, ESex,
  IIdTitlePair,
  IPager, IPushSettings,
  TPseudoBoolean, TPushSetting, TUser,
} from '../../types';

type TCounter =
  | 'friends'
  | 'friends_suggestions'
  | 'friends_recommendations'
  | 'messages'
  | 'menu_discover_badge'
  | 'menu_clips_badge'
  | 'menu_superapp_friends_badge'
  | 'photos'
  | 'videos'
  | 'gifts'
  | 'events'
  | 'groups'
  | 'notifications'
  | 'sdk'
  | 'app_requests';

type TGetInfoField =
  | 'country'
  | 'https_required'
  | 'own_posts_default'
  | 'no_wall_replies'
  | 'intro'
  | 'lang';

type TDeviceIdOrToken = {token: string} | {device_id: number};

export enum EAccountBirthDateVisibility {
  NotShown,
  Shown,
  ShowDayAndMonth,
}

type TNameRequest = {
  id: number;
  first_name: string;
  last_name: string;
} & ({
  status: 'processing' | 'declined' | 'response';
} | {
  status: 'response_with_link';
  link: string;
} | {
  status: 'was_accepted' | 'was_declined';
  repeat_date: string;
})

/**
 * @see https://vk.com/dev/account.ban
 */
export interface IBanParams {
  owner_id: number;
}

export type TBanResult = 1;

/**
 * @see https://vk.com/dev/account.changePassword
 */
export interface IChangePasswordParams {
  restore_sid?: string;
  change_password_hash?: string;
  old_password?: string;
  new_password: string;
}

export interface IChangePasswordResult {
  token: string;
}

/**
 * @see https://vk.com/dev/account.getActiveOffers
 */
export interface IGetActiveOffersParams {
  offset?: number;
  count?: number;
}

// FIXME
export interface IGetActiveOffersResult
  extends IPager<Record<string, unknown>> {

}

/**
 * @see https://vk.com/dev/account.getAppPermissions
 */
export interface IGetAppPermissionsParams {
  user_id: number;
}

export type TGetAppPermissionsResult = number;

/**
 * @see https://vk.com/dev/account.getBanned
 */
export interface IGetBannedParams {
  offset?: number;
  count?: number;
}

export interface IGetBannedResult extends IPager<number> {
  profiles: {
    id: number;
    first_name: string;
    last_name: string;
    deactivated: 'banned';
  }[];
}

/**
 * @see https://vk.com/dev/account.getCounters
 */
export interface IGetCountersParams {
  filter?: TCounter[];
}

export type TGetCountersResult = [] | Partial<Record<TCounter, number>>;

/**
 * @see https://vk.com/dev/account.getInfo
 */
export interface IGetInfoParams {
  fields?: TGetInfoField[];
}

export interface IGetInfoResult {
  '2faRequired'?: TPseudoBoolean;
  country?: string;
  community_comments?: boolean;
  https_required?: TPseudoBoolean;
  intro?: TPseudoBoolean;
  link_redirects?: Record<string, string>;
  lang?: number;
  no_wall_replies?: TPseudoBoolean;
  own_posts_default?: TPseudoBoolean;
  settings?: {
    available: boolean;
    forced: boolean;
    name: string;
    value: string;
  }[];
  subscription_country: string;
}

/**
 * @see https://vk.com/dev/account.getProfileInfo
 */
export interface IGetProfileInfoParams {
}

export interface IGetProfileInfoResult {
  first_name: string;
  id: number;
  last_name: string;
  maiden_name?: string;
  name_request?: TNameRequest;
  screen_name?: string;
  sex: ESex;
  home_town: string;
  status: string;
  bdate: string;
  bdate_visibility: EAccountBirthDateVisibility;
  city?: IIdTitlePair;
  country?: IIdTitlePair;
  phone: string;
  relation: ERelationsStatus;
  relation_partner?: TUser;
  relation_pending?: TPseudoBoolean;
  relation_requests?: TUser[];
}

/**
 * @see https://vk.com/dev/account.getPushSettings
 */
export type TGetPushSettingsParams = TDeviceIdOrToken;

export interface IGetPushSettingsResult {
  disabled: TPseudoBoolean;
  disabled_until?: number;
  settings?: IPushSettings;
  conversations: IPager<{
    disabled_until: number;
    peer_id: number;
    sound: TPseudoBoolean;
    disabled_mentions: TPseudoBoolean;
    disabled_mass_mentions: TPseudoBoolean;
  }>
}

/**
 * @see https://vk.com/dev/account.registerDevice
 */
export interface IRegisterDeviceParams {
  token: string;
  device_model?: string;
  device_year?: number;
  device_id: number;
  system_version?: string;
  settings?: IPushSettings;
  sandbox?: boolean;
}

export type TRegisterDeviceResult = 1;

/**
 * @see https://vk.com/dev/account.saveProfileInfo
 */
export interface ISaveProfileInfoParams {
  first_name?: string;
  last_name?: string;
  maiden_name?: string;
  screen_name?: string;
  cancel_request_id?: number;
  sex?: Exclude<ESex, ESex.Unknown>;
  relation?: ERelationsStatus;
  relation_partner_id?: number;
  bdate?: string;
  bdate_visibility?: EAccountBirthDateVisibility;
  home_town?: string;
  country_id?: number;
  city_id?: number;
  status?: string;
}

export interface ISaveProfileInfoResult {
  changed: TPseudoBoolean;
  name_request?: TNameRequest;
}

/**
 * @see https://vk.com/dev/account.setInfo
 */
type TSetInfoParam<K, V> = {name: K; value: V};

export type TSetInfoParams =
  | TSetInfoParam<'intro', number>
  | TSetInfoParam<'own_posts_default', TPseudoBoolean>
  | TSetInfoParam<'no_wall_replies', TPseudoBoolean>;

export type TSetInfoResult = 1;

/**
 * @see https://vk.com/dev/account.setNameInMenu
 */
export interface ISetNameInMenuParams {
  user_id: number;
  name: string;
}

export type TSetNameInMenuResult = 1;

/**
 * @see https://vk.com/dev/account.setOffline
 */
export interface ISetOfflineParams {
}

export type TSetOfflineResult = 1;

/**
 * @see https://vk.com/dev/account.setOnline
 */
export interface ISetOnlineParams {
  voip?: boolean;
}

export type TSetOnlineResult = 1;

/**
 * @see https://vk.com/dev/account.setPushSettings
 */
export type TSetPushSettingsParams = TDeviceIdOrToken & {
  settings: IPushSettings;
  key: string;
  value: TPushSetting[];
};

export type TSetPushSettingsResult = 1;

/**
 * @see https://vk.com/dev/account.setSilenceMode
 */
export type TSetSilenceModeParams = TDeviceIdOrToken & {
  time: number;
  chat_id?: number;
  user_id?: number;
  peer_id?: number;
  sound: TPseudoBoolean;
};

export type TSetSilenceModeResult = 1;

/**
 * @see https://vk.com/dev/account.unban
 */
export interface IUnbanParams {
  owner_id: number;
}

export type TUnbanResult = 1;

/**
 * @see https://vk.com/dev/account.unregisterDevice
 */
export type TUnregisterDeviceParams = TDeviceIdOrToken & {sandbox?: boolean};

export type TUnregisterDeviceResult = 1;
