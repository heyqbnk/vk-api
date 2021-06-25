import {IVKAPI} from '../../VKAPI';
import {isVKAPIRequestPerformAllowedMessage} from './utils';
import {TAddRepository, TSendRequest} from '../../types';
import {IVKAPIConsumerConstructorProps} from './types';
import {Core} from '../../Core';
import {IVKAPIPerformRequestMessage} from '../types';
import {PERFORM_REQUEST_EVENT} from '../constants';

/**
 * Stub class which wants to get data from API VKontakte and has to
 * communicate with master.
 */
export class VKAPIConsumer extends Core implements IVKAPI {
  /**
   * Tunnel name.
   */
  private readonly tunnelName: string;
  /**
   * Internal request counter. Required to send and get answers from master.
   * @type {string}
   */
  private requestId = '0';
  /**
   * Instance of VKAPI which performs requests.
   * @type {IVKAPI}
   * @private
   */
  private readonly instance: IVKAPI;

  constructor(props: IVKAPIConsumerConstructorProps) {
    super();
    if (!process.send) {
      throw new Error(
        'Unable to create VKAPIConsumer due to there is no "process.send" ' +
        'method available. It looks like it was created in main thread, ' +
        'but not in fork.',
      );
    }
    const {tunnelName = '', instance} = props;
    this.tunnelName = tunnelName;
    this.instance = instance;

    // Initialize repositories with specified addRequestToQueue method.
    this.init(this.addRequestToQueue);
  }

  sendRequest: TSendRequest = config => this.instance.sendRequest(config);

  addRequestToQueue: TSendRequest = config => {
    if (!process.send) {
      throw new Error(
        'Unable to process VKAPI request from slave due to there is no ' +
        '"process.send" method available. It looks like it was created in ' +
        'main thread, but not in fork',
      );
    }
    const requestId = (parseInt(this.requestId) + 1).toString(16);
    const message: IVKAPIPerformRequestMessage = {
      tunnelName: this.tunnelName,
      requestId,
      isVKAPIMessage: true,
      type: PERFORM_REQUEST_EVENT,
    };

    // Reassign request id.
    this.requestId = requestId;

    // Return promise
    const promise = new Promise<any>((res, rej) => {
      // Create listener and wait for provider permission.
      const listener = async (message: any) => {
        if (
          isVKAPIRequestPerformAllowedMessage(message) &&
          message.tunnelName === this.tunnelName &&
          message.requestId === requestId
        ) {
          // Remove event listener.
          process.off('message', listener);

          try {
            res(this.instance.sendRequest(config));
          } catch (e) {
            rej(e);
          }
        }
      };
      // Add event listener.
      process.on('message', listener);
    });

    // Send request message.
    process.send(message);

    return promise;
  };

  addRepository: TAddRepository<this> = (name, Repo) => {
    return super.addRepository(name, Repo, this.addRequestToQueue);
  }
}
