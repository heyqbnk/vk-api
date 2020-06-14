import {NameCaseType, User, UserFieldType} from '../../types';

/**
 * @see https://vk.com/dev/users.get
 */
export interface GetParams {
  userIds: Array<string | number>;
  fields?: UserFieldType[];
  nameCase?: NameCaseType;
}

export type GetResult = User[];
