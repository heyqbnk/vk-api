import {Repository} from '../Repository';
import {RepositoryMethod, SendRequest} from '../../types';
import {GetParams, GetResult} from './types';
import {arrayToString} from '../../utils';

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
    const {userIds, ...rest} = params;
    return this.sendRequest({
      method: 'get',
      params: {
        ...rest,
        userIds: arrayToString(userIds)
      },
    });
  };
}
