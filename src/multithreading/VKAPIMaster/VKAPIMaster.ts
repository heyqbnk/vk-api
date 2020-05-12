import {VKAPIMasterConstructorProps} from './types';
import {Worker} from 'cluster';
import {VKAPIInterface} from '../../VKAPI';
import {isVKAPIProcessRequestMessage} from './utils';
import {MessageTypeEnum, VKAPIRequestProcessedMessage} from '../types';

/**
 * Master class which receives orders to perform requests to VKAPI
 */
export class VKAPIMaster {
  /**
   * Slave threads
   */
  private readonly threads: Worker[];

  /**
   * API client which executes requests
   */
  private readonly client: VKAPIInterface;

  constructor(props: VKAPIMasterConstructorProps) {
    const {client, threads} = props;
    this.client = client;
    this.threads = threads;

    this.init();
  }

  /**
   * Initializes threads listening
   */
  private init() {
    this.threads.forEach(thread => {
      // Listen to incoming messages from threads
      thread.on('message', async message => {
        // Work only with process-request messages
        if (isVKAPIProcessRequestMessage(message)) {
          const {requestId, processId, config} = message;
          let error: Error | null = null;
          let data: any | null = null;

          // Trying to execute request
          try {
            data = await this.client.processRequest(config);
          } catch (e) {
            error = e;
          }
          const answerMessage: VKAPIRequestProcessedMessage = {
            processId,
            requestId,
            isVKAPIMessage: true,
            type: MessageTypeEnum.RequestProcessed,
            error,
            data,
          };
          thread.send(answerMessage);
        }
      });
    });
  }
}
