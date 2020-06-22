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
  public getServerUrl = this.r<GetServerUrlParams, GetServerUrlResult>(
    'getServerUrl',
  );

  /**
   * @see https://vk.com/dev/streaming.getSettings
   * @type {RepositoryMethod<GetSettingsParams, GetSettingsResult>}
   */
  public getSettings = this.r<GetSettingsParams, GetSettingsResult>(
    'getSettings',
  );

  /**
   * @see https://vk.com/dev/streaming.getStats
   * @type {RepositoryMethod<GetStatsParams, GetStatsResult>}
   */
  public getStats = this.r<GetStatsParams, GetStatsResult>('getStats');

  /**
   * @see https://vk.com/dev/streaming.getStem
   * @type {RepositoryMethod<GetStemParams, GetStemResult>}
   */
  public getStem = this.r<GetStemParams, GetStemResult>('getStem');

  /**
   * @see https://vk.com/dev/streaming.setSettings
   * @type {RepositoryMethod<SetSettingsParams, SetSettingsResult>}
   */
  public setSettings = this.r<SetSettingsParams, SetSettingsResult>(
    'setSettings',
  );
}
