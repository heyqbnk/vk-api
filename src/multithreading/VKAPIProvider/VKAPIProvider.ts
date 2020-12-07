import {VKAPIMasterConstructorProps} from './types';
import {Worker} from 'cluster';
import {VKAPIInterface} from '../../VKAPI';
import {isVKAPIProcessRequestMessage} from './utils';
import {VKAPIRequestProcessedMessage} from '../types';

/**
 * Master class which receives orders to perform requests to VKAPI
 */
export class VKAPIProvider {
  /**
   * Slave threads
   */
  private readonly workers: Worker[];

  /**
   * API client which executes requests
   */
  private readonly instance: VKAPIInterface;

  /**
   * Tunnel name
   */
  private readonly tunnelName: string;

  constructor(props: VKAPIMasterConstructorProps) {
    const {
      instance, workers, tunnelName = '',
      maxProcessEventListenersCount,
    } = props;
    this.instance = instance;
    this.workers = workers;
    this.tunnelName = tunnelName;

    if (typeof maxProcessEventListenersCount === 'number') {
      process.setMaxListeners(maxProcessEventListenersCount);
    }
  }

  /**
   * Initializes threads listening
   */
  init() {
    this.workers.forEach(w => {
      // Listen to incoming messages from threads
      w.on('message', async message => {
        // Work only with process-request messages and which are forwarded
        // to current master
        if (
          isVKAPIProcessRequestMessage(message) &&
          this.tunnelName === message.tunnelName
        ) {
          const {requestId, processId, config} = message;
          let error: Error | null = null;
          let data: any = null;

          // Trying to execute request
          try {
            data = await this.instance.addRequestToQueue(config);
          } catch (e) {
            error = e;
          }
          const answerMessage: VKAPIRequestProcessedMessage = {
            tunnelName: this.tunnelName,
            processId,
            requestId,
            isVKAPIMessage: true,
            type: 'request-processed',
            error,
            data,
          };
          w.send(answerMessage);
        }
      });
    });
  }
}

/**
 * TODO: Remove in 2.0.0
 * @deprecated
 */
export {VKAPIProvider as VKAPIMaster};
