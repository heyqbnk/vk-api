import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IGetServerUrlParams,
  IGetServerUrlResult,
  IGetSettingsParams,
  IGetSettingsResult,
  IGetStatsParams,
  IGetStatsResult,
  IGetStemParams, IGetStemResult, ISetSettingsParams, TSetSettingsResult,
} from './types';

export class StreamingRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('streaming', sendRequest);
  }

  /**
   * @see https://vk.com/dev/streaming.getServerUrl
   * @type {TRepositoryMethod<IGetServerUrlParams, IGetServerUrlResult>}
   */
  getServerUrl = this.r<IGetServerUrlParams, IGetServerUrlResult>(
    'getServerUrl',
  );

  /**
   * @see https://vk.com/dev/streaming.getSettings
   * @type {TRepositoryMethod<IGetSettingsParams, IGetSettingsResult>}
   */
  getSettings = this.r<IGetSettingsParams, IGetSettingsResult>(
    'getSettings',
  );

  /**
   * @see https://vk.com/dev/streaming.getStats
   * @type {TRepositoryMethod<IGetStatsParams, IGetStatsResult>}
   */
  getStats = this.r<IGetStatsParams, IGetStatsResult>('getStats');

  /**
   * @see https://vk.com/dev/streaming.getStem
   * @type {TRepositoryMethod<IGetStemParams, IGetStemResult>}
   */
  getStem = this.r<IGetStemParams, IGetStemResult>('getStem');

  /**
   * @see https://vk.com/dev/streaming.setSettings
   * @type {TRepositoryMethod<ISetSettingsParams, TSetSettingsResult>}
   */
  setSettings = this.r<ISetSettingsParams, TSetSettingsResult>(
    'setSettings',
  );
}
