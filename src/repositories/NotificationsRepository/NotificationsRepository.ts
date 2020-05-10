import {
  NotificationsRepositoryInterface,
  NotificationsRepositoryConstructorProps,
  SendMessageMethod,
  SendMessageResultType,
  MarkAsViewedMethod,
  MarkAsViewedResultType,
} from './types';
import {Repository} from '../../Repository';

/**
 * Repository to work with notifications
 */
export class NotificationsRepository
  extends Repository
  implements NotificationsRepositoryInterface {

  constructor(props: NotificationsRepositoryConstructorProps) {
    super({processRequest: props.processRequest, name: 'notifications'});
  }

  /**
   * Marks notifications as viewed
   * @param {RequestOptionalParams | undefined} options
   * @returns {Promise<MarkAsViewedResultType>}
   */
  public markAsViewed: MarkAsViewedMethod = options =>
    this.processRequest<MarkAsViewedResultType>({
      method: 'sendMessage',
      options: options || {},
    });

  /**
   * Sends notification
   * @param options
   * @returns {Promise<SendMessageResultType[]>}
   */
  public sendMessage: SendMessageMethod = options =>
    this.processRequest<SendMessageResultType[]>({
      method: 'sendMessage',
      options,
    });
}
