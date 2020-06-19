import {
  MarkAsViewedResult,
  SendMessageResult,
  SendMessageParams, MarkAsViewedParams,
} from './types';
import {Repository} from '../Repository';
import {RepositoryMethod, SendRequest} from '../../types';

/**
 * Repository to work with notifications
 */
export class NotificationsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('notifications', sendRequest);
  }

  /**
   * @see https://vk.com/dev/notifications.markAsViewed
   * @returns {Promise<any>}
   */
  public markAsViewed: RepositoryMethod<MarkAsViewedParams,
    MarkAsViewedResult> = () => this.sendRequest({
    method: 'markAsViewed',
    params: {},
  });

  /**
   * @see https://vk.com/dev/notifications.sendMessage
   * @param {SendMessageParams & RequestOptionalParams} params
   * @returns {Promise<any>}
   */
  public sendMessage: RepositoryMethod<SendMessageParams, SendMessageResult> = (
    {userIds, ...rest},
  ) => this.sendRequest({
    method: 'sendMessage',
    params: {
      ...rest,
      userIds: userIds.join(',')
    },
  });
}
