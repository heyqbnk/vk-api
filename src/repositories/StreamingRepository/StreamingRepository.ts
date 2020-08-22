import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  GetServerUrlParams,
  GetServerUrlResult,
  GetSettingsParams,
  GetSettingsResult,
  GetStatsParams,
  GetStatsResult,
  GetStemParams, GetStemResult, SetSettingsParams, SetSettingsResult,
} from './types';

export class StreamingRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('streaming', sendRequest);
  }

  /**
   * @see https://vk.com/dev/streaming.getServerUrl
   * @type {RepositoryMethod<GetServerUrlParams, GetServerUrlResult>}
   */
  getServerUrl = this.r<GetServerUrlParams, GetServerUrlResult>(
    'getServerUrl',
  );

  /**
   * @see https://vk.com/dev/streaming.getSettings
   * @type {RepositoryMethod<GetSettingsParams, GetSettingsResult>}
   */
  getSettings = this.r<GetSettingsParams, GetSettingsResult>(
    'getSettings',
  );

  /**
   * @see https://vk.com/dev/streaming.getStats
   * @type {RepositoryMethod<GetStatsParams, GetStatsResult>}
   */
  getStats = this.r<GetStatsParams, GetStatsResult>('getStats');

  /**
   * @see https://vk.com/dev/streaming.getStem
   * @type {RepositoryMethod<GetStemParams, GetStemResult>}
   */
  getStem = this.r<GetStemParams, GetStemResult>('getStem');

  /**
   * @see https://vk.com/dev/streaming.setSettings
   * @type {RepositoryMethod<SetSettingsParams, SetSettingsResult>}
   */
  setSettings = this.r<SetSettingsParams, SetSettingsResult>(
    'setSettings',
  );
}
