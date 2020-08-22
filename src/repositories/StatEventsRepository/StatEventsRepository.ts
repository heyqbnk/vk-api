import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  AddMiniAppsCustomParams,
  AddMiniAppsCustomResult,
  AddMiniAppsParams,
} from './types';

export class StatEventsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('statEvents', sendRequest);
  }

  /**
   * @see https://vk.com/dev/statEvents.addMiniAppsCustom
   * @type {RepositoryMethod<AddMiniAppsCustomParams, AddMiniAppsCustomResult>}
   */
  addMiniAppsCustom = this.r<AddMiniAppsCustomParams,
    AddMiniAppsCustomResult>('addMiniAppsCustom');

  /**
   * @see https://vk.com/dev/statEvents.addMiniApps
   * @type {RepositoryMethod<AddMiniAppsParams, AddMiniAppsCustomResult>}
   */
  addMiniApps = this.r<AddMiniAppsParams,
    AddMiniAppsCustomResult>('addMiniApps');
}
