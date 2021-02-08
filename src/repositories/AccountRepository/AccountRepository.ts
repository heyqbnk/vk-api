import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IBanParams,
  TBanResult,
  IChangePasswordParams,
  IChangePasswordResult,
  IGetActiveOffersParams,
  IGetActiveOffersResult,
  IGetAppPermissionsParams,
  TGetAppPermissionsResult,
  IGetBannedParams,
  IGetBannedResult,
  IGetCountersParams,
  TGetCountersResult,
  IGetInfoParams,
  IGetInfoResult,
  IGetProfileInfoParams,
  IGetProfileInfoResult,
  TGetPushSettingsParams,
  IGetPushSettingsResult,
  IRegisterDeviceParams,
  TRegisterDeviceResult,
  ISetOfflineParams,
  TSetOfflineResult,
  ISetOnlineParams,
  TSetOnlineResult,
  IUnbanParams,
  TUnbanResult,
  TUnregisterDeviceParams,
  TUnregisterDeviceResult,
  TSetSilenceModeParams,
  TSetSilenceModeResult,
  TSetInfoParams,
  TSetInfoResult,
  ISetNameInMenuParams,
  TSetNameInMenuResult,
  TSetPushSettingsParams,
  TSetPushSettingsResult, ISaveProfileInfoParams, ISaveProfileInfoResult,
} from './types';
import {formatOptionalArray, formatOptionalBoolean} from '../../utils';

export class AccountRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('account', sendRequest);
  }

  /**
   * @see https://vk.com/dev/account.ban
   * @type {(params: (IBanParams & IRequestOptionalParams)) => Promise<1>}
   */
  ban = this.r<IBanParams, TBanResult>('ban');

  /**
   * @see https://vk.com/dev/account.changePassword
   * @type {(params: (IChangePasswordParams & IRequestOptionalParams)) => Promise<IChangePasswordResult>}
   */
  changePassword = this.r<IChangePasswordParams, IChangePasswordResult>(
    'changePassword',
  );

  /**
   * @see https://vk.com/dev/account.getActiveOffers
   * @type {(params: (IGetActiveOffersParams & IRequestOptionalParams)) => Promise<IGetActiveOffersResult>}
   */
  getActiveOffers = this.r<IGetActiveOffersParams, IGetActiveOffersResult>(
    'getActiveOffers',
  );

  /**
   * @see https://vk.com/dev/account.getAppPermissions
   * @type {(params: (IGetAppPermissionsParams & IRequestOptionalParams)) => Promise<number>}
   */
  getAppPermissions = this
    .r<IGetAppPermissionsParams, TGetAppPermissionsResult>('getAppPermissions');

  /**
   * @see https://vk.com/dev/account.getBanned
   * @type {(params: (IGetBannedParams & IRequestOptionalParams)) => Promise<IGetBannedResult>}
   */
  getBanned = this.r<IGetBannedParams, IGetBannedResult>('getBanned');

  /**
   * @see https://vk.com/dev/account.getCounters
   * @type {(params: (IGetCountersParams & IRequestOptionalParams)) => Promise<[] | Partial<Record<"friends" | "friends_suggestions" | "friends_recommendations" | "messages" | "menu_discover_badge" | "menu_clips_badge" | "menu_superapp_friends_badge" | "photos" | "videos" | "gifts" | "events" | "groups" | "notifications" | "sdk" | "app_requests", number>>>}
   */
  getCounters = this.r<IGetCountersParams, TGetCountersResult>(
    'getCounters',
    ({filter, ...rest}) => ({
      ...rest,
      filter: formatOptionalArray(filter),
    }),
  );

  /**
   * @see https://vk.com/dev/account.getInfo
   * @type {(params: (IGetInfoParams & IRequestOptionalParams)) => Promise<IGetInfoResult>}
   */
  getInfo = this.r<IGetInfoParams, IGetInfoResult>(
    'getInfo',
    ({fields, ...rest}) => ({
      ...rest,
      fields: formatOptionalArray(fields),
    }),
  );

  /**
   * @see https://vk.com/dev/account.getProfileInfo
   * @type {(params: (IGetProfileInfoParams & IRequestOptionalParams)) => Promise<IGetProfileInfoResult>}
   */
  getProfileInfo = this.r<IGetProfileInfoParams, IGetProfileInfoResult>(
    'getProfileInfo',
  );

  /**
   * @see https://vk.com/dev/account.getPushSettings
   * @type {(params: (({token: string} & IRequestOptionalParams) | ({deviceId: number} & IRequestOptionalParams))) => Promise<IGetPushSettingsResult>}
   */
  getPushSettings = this.r<TGetPushSettingsParams, IGetPushSettingsResult>(
    'getPushSettings',
  );

  /**
   * @see https://vk.com/dev/account.registerDevice
   * @type {(params: (IRegisterDeviceParams & IRequestOptionalParams)) => Promise<1>}
   */
  registerDevice = this.r<IRegisterDeviceParams, TRegisterDeviceResult>(
    'registerDevice',
    ({sandbox, ...rest}) => ({
      ...rest,
      sandbox: formatOptionalBoolean(sandbox),
    }),
  );

  /**
   * @see https://vk.com/dev/account.saveProfileInfo
   * @type {(params: (ISaveProfileInfoParams & IRequestOptionalParams)) => Promise<ISaveProfileInfoResult>}
   */
  saveProfileInfo = this.r<ISaveProfileInfoParams, ISaveProfileInfoResult>(
    'saveProfileInfo'
  );

  /**
   * @see https://vk.com/dev/account.setInfo
   * @type {(params: ((TSetInfoParam<"intro", number> & IRequestOptionalParams) | (TSetInfoParam<"own_posts_default", 0 | 1> & IRequestOptionalParams) | (TSetInfoParam<"no_wall_replies", 0 | 1> & IRequestOptionalParams))) => Promise<1>}
   */
  setInfo = this.r<TSetInfoParams, TSetInfoResult>('setInfo');

  /**
   * @see https://vk.com/dev/account.setNameInMenu
   * @type {(params: (ISetNameInMenuParams & IRequestOptionalParams)) => Promise<1>}
   */
  setNameInMenu = this.r<ISetNameInMenuParams, TSetNameInMenuResult>(
    'setNameInMenu'
  );

  /**
   * @see https://vk.com/dev/account.setOffline
   * @type {(params: (ISetOfflineParams & IRequestOptionalParams)) => Promise<1>}
   */
  setOffline = this.r<ISetOfflineParams, TSetOfflineResult>('setOffline');

  /**
   * @see https://vk.com/dev/account.setOnline
   * @type {(params: (ISetOnlineParams & IRequestOptionalParams)) => Promise<1>}
   */
  setOnline = this.r<ISetOnlineParams, TSetOnlineResult>(
    'setOnline',
    ({voip, ...rest}) => ({...rest, voip: formatOptionalBoolean(voip)}),
  );

  /**
   * @see https://vk.com/dev/account.setPushSettings
   * @type {(params: (({token: string} & {settings: IPushSettings, key: string, value: TPushSetting[]} & IRequestOptionalParams) | ({deviceId: number} & {settings: IPushSettings, key: string, value: TPushSetting[]} & IRequestOptionalParams))) => Promise<1>}
   */
  setPushSettings = this.r<TSetPushSettingsParams, TSetPushSettingsResult>(
    'setPushSettings'
  );

  /**
   * @see https://vk.com/dev/account.setSilenceMode
   * @type {(params: (TSetSilenceModeParams & IRequestOptionalParams)) => Promise<1>}
   */
  setSilenceMode = this.r<TSetSilenceModeParams, TSetSilenceModeResult>(
    'setSilenceMode',
    ({sound, ...rest}) => ({
      ...rest,
      sound: formatOptionalBoolean(sound),
    }),
  );

  /**
   * @see https://vk.com/dev/account.unban
   * @type {(params: (IUnbanParams & IRequestOptionalParams)) => Promise<1>}
   */
  unban = this.r<IUnbanParams, TUnbanResult>('unban');

  /**
   * @see https://vk.com/dev/account.unregisterDevice
   * @type {(params: (({token: string} & {sandbox?: boolean} & IRequestOptionalParams) | ({deviceId: number} & {sandbox?: boolean} & IRequestOptionalParams))) => Promise<1>}
   */
  unregisterDevice = this.r<TUnregisterDeviceParams, TUnregisterDeviceResult>(
    'unregisterDevice',
    ({sandbox, ...rest}) => ({
      ...rest,
      sandbox: formatOptionalBoolean(sandbox),
    }),
  );
}
