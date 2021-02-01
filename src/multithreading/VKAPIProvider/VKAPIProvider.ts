import {IVKAPIProviderConstructorProps} from './types';
import {Worker} from 'cluster';
import {isVKAPIProcessRequestMessage} from './utils';
import {IVKAPIRequestPerformAllowedMessage} from '../types';
import {Queue} from '../../Queue';
import {REQUEST_PERFORM_ALLOWED_EVENT} from '../constants';

/**
 * Master class which receives orders to perform requests to VKAPI.
 */
export class VKAPIProvider {
  /**
   * Slave threads.
   */
  private readonly workers: Worker[];
  /**
   * Tunnel name.
   */
  private readonly tunnelName: string;
  /**
   * Queue of requests.
   * @type {Queue}
   * @private
   */
  private readonly queue: Queue;

  constructor(props: IVKAPIProviderConstructorProps) {
    const {
      workers, tunnelName = '',
      maxProcessEventListenersCount,
      rps = 3,
    } = props;
    this.workers = workers;
    this.tunnelName = tunnelName;
    this.queue = new Queue({timeout: Math.ceil(1000 / rps)});

    if (typeof maxProcessEventListenersCount === 'number') {
      process.setMaxListeners(maxProcessEventListenersCount);
    }
  }

  /**
   * Initializes threads listening.
   */
  init() {
    // Listen to incoming messages from threads.
    for (const worker of this.workers) {
      worker.on('message', async message => {
        // When message is captured, check if it is a message from consumer
        // and its tunnel is equal to current provider tunnel.
        if (
          isVKAPIProcessRequestMessage(message) &&
          this.tunnelName === message.tunnelName
        ) {
          // Await until call can be performed.
          await this.queue.await();

          // Notify worker, it can call its request.
          const answerMessage: IVKAPIRequestPerformAllowedMessage = {
            tunnelName: this.tunnelName,
            requestId: message.requestId,
            isVKAPIMessage: true,
            type: REQUEST_PERFORM_ALLOWED_EVENT,
          };
          worker.send(answerMessage);
        }
      });
    }
  }
}
