import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {GetParams, GetResult} from './types';
import {formatOptionalArray} from '../../utils';

export class UsersRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('users', sendRequest);
  }

  /**
   * @see https://vk.com/dev/users.get
   * @type {RepositoryMethod<GetParams, GetResult>}
   */
  get = this.r<GetParams, GetResult>(
    'get',
    ({userIds, fields, ...rest}) => ({
      ...rest,
      userIds: formatOptionalArray(userIds),
      fields: formatOptionalArray(fields),
    }),
  );
}
