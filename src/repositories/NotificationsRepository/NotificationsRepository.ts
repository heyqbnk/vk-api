import {
  MarkAsViewedResult,
  SendMessageResult,
  SendMessageParams, MarkAsViewedParams,
} from './types';
import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {formatOptionalArray} from '../../utils';

/**
 * Repository to work with notifications
 */
export class NotificationsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('notifications', sendRequest);
  }

  /**
   * @see https://vk.com/dev/notifications.markAsViewed
   * @type {RepositoryMethod<MarkAsViewedParams, MarkAsViewedResult>}
   */
  public markAsViewed = this.r<MarkAsViewedParams, MarkAsViewedResult>(
    'markAsViewed',
  );

  /**
   * @see https://vk.com/dev/notifications.sendMessage
   * @type {RepositoryMethod<SendMessageParams, SendMessageResult>}
   */
  public sendMessage = this.r<SendMessageParams, SendMessageResult>(
    'sendMessage',
    ({userIds, ...rest}) => ({
      ...rest,
      userIds: formatOptionalArray(userIds),
    }),
  );
}
