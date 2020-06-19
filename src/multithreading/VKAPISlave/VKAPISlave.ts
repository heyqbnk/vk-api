import {VKAPIInterface} from '../../VKAPI';
import {VKAPIProcessRequestMessage} from '../types';
import {isVKAPIRequestProcessedMessage} from './utils';
import {
  UsersRepository,
  MessagesRepository,
  NotificationsRepository, DatabaseRepository, UtilsRepository,
} from '../../repositories';
import {SendRequest} from '../../types';
import {VKAPISlaveConstructorProps} from './types';

/**
 * Stub class which wants to get data from API VKontakte and has to
 * communicate with master
 */
export class VKAPISlave implements VKAPIInterface {
  public database: DatabaseRepository;
  public messages: MessagesRepository;
  public notifications: NotificationsRepository;
  public users: UsersRepository;
  public utils: UtilsRepository;

  /**
   * Tunnel name
   */
  private tunnelName: string;

  /**
   * Internal request counter. Required to send and get answers from master
   * @type {string}
   */
  private requestId = '0';

  public constructor(props: VKAPISlaveConstructorProps = {}) {
    if (!process.send) {
      throw new Error(
        'Unable to create VKAPISlave due to there is no "process.send" ' +
        'method available. It looks like it was created in main thread, ' +
        'but not in fork',
      );
    }
    const {tunnelName = ''} = props;
    this.tunnelName = tunnelName;
    this.database = new DatabaseRepository(this.addRequestToQueue);
    this.messages = new MessagesRepository(this.addRequestToQueue);
    this.notifications = new NotificationsRepository(this.addRequestToQueue);
    this.users = new UsersRepository(this.addRequestToQueue);
    this.utils = new UtilsRepository(this.addRequestToQueue);
  }

  public addRequestToQueue: SendRequest = config => {
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
      tunnelName: this.tunnelName,
      processId,
      requestId,
      isVKAPIMessage: true,
      type: 'process-request',
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
          isVKAPIRequestProcessedMessage(message) &&
          message.tunnelName === this.tunnelName &&
          message.requestId === requestId &&
          message.processId === processId
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
