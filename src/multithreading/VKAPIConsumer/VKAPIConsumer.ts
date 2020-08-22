import {VKAPIInterface} from '../../VKAPI';
import {VKAPIProcessRequestMessage} from '../types';
import {isVKAPIRequestProcessedMessage} from './utils';
import {SendRequest} from '../../types';
import {VKAPISlaveConstructorProps} from './types';
import {VKAPICore} from '../../VKAPICore';

/**
 * Stub class which wants to get data from API VKontakte and has to
 * communicate with master
 */
export class VKAPIConsumer extends VKAPICore implements VKAPIInterface {
  /**
   * Tunnel name
   */
  private readonly tunnelName: string;

  /**
   * Internal request counter. Required to send and get answers from master
   * @type {string}
   */
  private requestId = '0';

  constructor(props: VKAPISlaveConstructorProps = {}) {
    super();
    if (!process.send) {
      throw new Error(
        'Unable to create VKAPIConsumer due to there is no "process.send" ' +
        'method available. It looks like it was created in main thread, ' +
        'but not in fork',
      );
    }
    const {tunnelName = ''} = props;
    this.tunnelName = tunnelName;

    // Initialize repositories with specified addRequestToQueue method
    this.init(this.addRequestToQueue);
  }

  addRequestToQueue: SendRequest = config => {
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

/**
 * TODO: Remove in 2.0.0
 * @deprecated
 */
export {VKAPIConsumer as VKAPISlave};
