import {Repository} from '../Repository';
import {RepositoryMethod, SendRequest} from '../../types';
import {GetParams, GetResult} from './types';

/**
 * Repository to work with users
 */
export class UsersRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('users', sendRequest);
  }

  /**
   * @see https://vk.com/dev/users.get
   * @param {GetParams & RequestOptionalParams} params
   * @returns {Promise<any>}
   */
  public get: RepositoryMethod<GetParams, GetResult> = params => {
    return this.sendRequest({
      method: 'get',
      params,
    });
  };
}
