import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {IGetPaidStatusParams, IGetPaidStatusResult} from './types';

export class DownloadedGamesRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('downloadedGames', sendRequest);
  }

  /**
   * @see https://vk.com/dev/downloadedGames.getPaidStatus
   */
  getPaidStatus = this.r<IGetPaidStatusParams, IGetPaidStatusResult>(
    'getPaidStatus',
  );
}
