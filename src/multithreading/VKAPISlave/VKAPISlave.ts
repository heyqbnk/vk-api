import {VKAPIInterface} from '../../VKAPI';
import {UsersRepository} from '../../repositories/UsersRepository';
import {NotificationsRepository} from '../../repositories/NotificationsRepository';
import {ProcessRequest} from '../../types';
import {MessageTypeEnum, VKAPIProcessRequestMessage} from '../types';
import {isVKAPIRequestProcessedMessage} from './utils';

/**
 * Stub class which wants to get data from API VKontakte and has to
 * communicate with master
 */
export class VKAPISlave implements VKAPIInterface {
  public users: UsersRepository;
  public notifications: NotificationsRepository;

  /**
   * Internal request counter. Required to send and get answers from master
   * @type {string}
   */
  private requestId = '0';

  public constructor() {
    if (!process.send) {
      throw new Error(
        'Unable to create VKAPISlave due to there is no "process.send" ' +
        'method available. It looks like it was created in main thread, ' +
        'but not in fork',
      );
    }

    this.users = new UsersRepository({processRequest: this.processRequest});
    this.notifications = new NotificationsRepository({
      processRequest: this.processRequest,
    });
  }

  public processRequest: ProcessRequest = config => {
    if (!process.send) {
      throw new Error(
        'Unable to process VKAPI request from slave due to there is no ' +
        '"process.send" method available. It looks like it was created in ' +
        'main thread, but not in fork',
      );
    }

    const requestId = (parseInt(this.requestId) + 1).toString(16);
    const processId = process.pid;
    const message: VKAPIProcessRequestMessage = {
      processId,
      requestId,
      isVKAPIMessage: true,
      type: MessageTypeEnum.ProcessRequest,
      config,
    };

    // Send order message
    process.send(message);

    // Reassign request id
    this.requestId = requestId;

    // Return promise
    return new Promise((res, rej) => {
      // Create listener to wait for answer
      const listener = (message: any) => {
        if (
          isVKAPIRequestProcessedMessage(message)
          && message.requestId === requestId
          && message.processId === processId
        ) {
          // Unbind listener
          process.off('message', listener);

          if (message.error) {
            return rej(message.error);
          }
          res(message.data);
        }
      };

      // Add event listener
      process.on('message', listener);
    });
  };
}
