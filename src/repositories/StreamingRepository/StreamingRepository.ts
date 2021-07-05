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
   */
  getServerUrl = this.r<IGetServerUrlParams, IGetServerUrlResult>(
    'getServerUrl',
  );

  /**
   * @see https://vk.com/dev/streaming.getSettings
   */
  getSettings = this.r<IGetSettingsParams, IGetSettingsResult>(
    'getSettings',
  );

  /**
   * @see https://vk.com/dev/streaming.getStats
   */
  getStats = this.r<IGetStatsParams, IGetStatsResult>('getStats');

  /**
   * @see https://vk.com/dev/streaming.getStem
   */
  getStem = this.r<IGetStemParams, IGetStemResult>('getStem');

  /**
   * @see https://vk.com/dev/streaming.setSettings
   */
  setSettings = this.r<ISetSettingsParams, TSetSettingsResult>(
    'setSettings',
  );
}
