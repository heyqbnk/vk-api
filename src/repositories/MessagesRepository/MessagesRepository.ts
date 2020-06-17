import {Repository} from '../Repository';
import {RepositoryMethod, SendRequest} from '../../types';
import {SendParams, SendResult} from './types';

/**
 * Repository to work with users
 */
export class MessagesRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('messages', sendRequest);
  }

  /**
   * @see https://vk.com/dev/messages.send
   * @param {SendParams & RequestOptionalParams} params
   * @returns {Promise<any>}
   */
  public send: RepositoryMethod<SendParams, SendResult> = params => {
    const {randomId, ...rest} = params;

    return this.sendRequest({
      method: 'send',
      params: {
        ...rest,
        randomId: randomId || Math.floor(Math.random() * 10000000),
      },
    });
  };
}
