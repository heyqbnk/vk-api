import {VKAPIMasterConstructorProps} from './types';
import {Worker} from 'cluster';
import {VKAPIInterface} from '../../VKAPI';
import {isVKAPIProcessRequestMessage} from './utils';
import {VKAPIRequestProcessedMessage} from '../types';

/**
 * Master class which receives orders to perform requests to VKAPI
 */
export class VKAPIMaster {
  /**
   * Slave threads
   */
  private readonly workers: Worker[];

  /**
   * API client which executes requests
   */
  private readonly instance: VKAPIInterface;

  constructor(props: VKAPIMasterConstructorProps) {
    const {instance, workers} = props;
    this.instance = instance;
    this.workers = workers;
  }

  /**
   * Initializes threads listening
   */
  private init() {
    this.workers.forEach(w => {
      // Listen to incoming messages from threads
      w.on('message', async message => {
        // Work only with process-request messages
        if (isVKAPIProcessRequestMessage(message)) {
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
