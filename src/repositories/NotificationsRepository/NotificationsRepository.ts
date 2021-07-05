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
   */
  markAsViewed = this.r<IMarkAsViewedParams, TMarkAsViewedResult>(
    'markAsViewed',
  );

  /**
   * @see https://vk.com/dev/notifications.sendMessage
   */
  sendMessage = this.r<ISendMessageParams, TSendMessageResult>(
    'sendMessage',
    ({user_ids, ...rest}) => ({
      ...rest,
      user_ids: formatOptionalArray(user_ids),
    }),
  );
}
