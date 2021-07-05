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
   */
  ban = this.r<IBanParams, TBanResult>('ban');

  /**
   * @see https://vk.com/dev/account.changePassword
   */
  changePassword = this.r<IChangePasswordParams, IChangePasswordResult>(
    'changePassword',
  );

  /**
   * @see https://vk.com/dev/account.getActiveOffers
   */
  getActiveOffers = this.r<IGetActiveOffersParams, IGetActiveOffersResult>(
    'getActiveOffers',
  );

  /**
   * @see https://vk.com/dev/account.getAppPermissions
   */
  getAppPermissions = this
    .r<IGetAppPermissionsParams, TGetAppPermissionsResult>('getAppPermissions');

  /**
   * @see https://vk.com/dev/account.getBanned
   */
  getBanned = this.r<IGetBannedParams, IGetBannedResult>('getBanned');

  /**
   * @see https://vk.com/dev/account.getCounters
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
   */
  getProfileInfo = this.r<IGetProfileInfoParams, IGetProfileInfoResult>(
    'getProfileInfo',
  );

  /**
   * @see https://vk.com/dev/account.getPushSettings
   */
  getPushSettings = this.r<TGetPushSettingsParams, IGetPushSettingsResult>(
    'getPushSettings',
  );

  /**
   * @see https://vk.com/dev/account.registerDevice
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
   */
  saveProfileInfo = this.r<ISaveProfileInfoParams, ISaveProfileInfoResult>(
    'saveProfileInfo',
  );

  /**
   * @see https://vk.com/dev/account.setInfo
   */
  setInfo = this.r<TSetInfoParams, TSetInfoResult>('setInfo');

  /**
   * @see https://vk.com/dev/account.setNameInMenu
   */
  setNameInMenu = this.r<ISetNameInMenuParams, TSetNameInMenuResult>(
    'setNameInMenu',
  );

  /**
   * @see https://vk.com/dev/account.setOffline
   */
  setOffline = this.r<ISetOfflineParams, TSetOfflineResult>('setOffline');

  /**
   * @see https://vk.com/dev/account.setOnline
   */
  setOnline = this.r<ISetOnlineParams, TSetOnlineResult>(
    'setOnline',
    ({voip, ...rest}) => ({...rest, voip: formatOptionalBoolean(voip)}),
  );

  /**
   * @see https://vk.com/dev/account.setPushSettings
   */
  setPushSettings = this.r<TSetPushSettingsParams, TSetPushSettingsResult>(
    'setPushSettings',
  );

  /**
   * @see https://vk.com/dev/account.setSilenceMode
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
   */
  unban = this.r<IUnbanParams, TUnbanResult>('unban');

  /**
   * @see https://vk.com/dev/account.unregisterDevice
   */
  unregisterDevice = this.r<TUnregisterDeviceParams, TUnregisterDeviceResult>(
    'unregisterDevice',
    ({sandbox, ...rest}) => ({
      ...rest,
      sandbox: formatOptionalBoolean(sandbox),
    }),
  );
}
