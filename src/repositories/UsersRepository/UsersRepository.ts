import {
  GetMethod,
  UsersRepositoryInterface,
  UsersRepositoryConstructorProps,
} from './types';
import {User} from '../../types';
import {Repository} from '../../Repository';

/**
 * Repository to work with users
 */
export class UsersRepository extends Repository implements UsersRepositoryInterface {
  constructor(props: UsersRepositoryConstructorProps) {
    super({processRequest: props.processRequest, name: 'users'});
  }

  /**
   * Returns info about users
   * @param {GetMethodOptions} options
   * @returns {Promise<User[]>}
   */
  public get: GetMethod = options =>
    this.processRequest<User[]>({
      method: 'get',
      options,
    });
}
