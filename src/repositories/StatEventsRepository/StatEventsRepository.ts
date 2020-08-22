import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {AddMiniAppsCustomParams, AddMiniAppsCustomResult} from './types';

export class StatEventsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('statEvents', sendRequest);
  }

  /**
   * @see addMiniAppsCustom
   * @type {RepositoryMethod<GetCommentsParams, GetCommentsResult>}
   */
  addMiniAppsCustom = this.r<AddMiniAppsCustomParams,
    AddMiniAppsCustomResult>('addMiniAppsCustom');
}
