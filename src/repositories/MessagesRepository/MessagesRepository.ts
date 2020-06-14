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
    return this.sendRequest({
      method: 'send',
      params,
    });
  };
}
