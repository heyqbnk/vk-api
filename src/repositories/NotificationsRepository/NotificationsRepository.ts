import {
  TMarkAsViewedResult,
  TSendMessageResult,
  ISendMessageParams, IMarkAsViewedParams,
} from './types';
import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {formatOptionalArray} from '../../utils';

export class NotificationsRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('notifications', sendRequest);
  }

  /**
   * @see https://vk.com/dev/notifications.markAsViewed
   * @type {TRepositoryMethod<IMarkAsViewedParams, TMarkAsViewedResult>}
   */
  markAsViewed = this.r<IMarkAsViewedParams, TMarkAsViewedResult>(
    'markAsViewed',
  );

  /**
   * @see https://vk.com/dev/notifications.sendMessage
   * @type {TRepositoryMethod<ISendMessageParams, TSendMessageResult>}
   */
  sendMessage = this.r<ISendMessageParams, TSendMessageResult>(
    'sendMessage',
    ({userIds, ...rest}) => ({
      ...rest,
      userIds: formatOptionalArray(userIds),
    }),
  );
}
