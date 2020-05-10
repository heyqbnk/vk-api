import {
  ProcessRequest,
  RequestOptionalParams,
  User,
  UserFieldType,
  NameCaseType,
} from '../../types';

export interface UsersRepositoryConstructorProps {
  processRequest: ProcessRequest;
}

/* GET */
interface GetMethodOptions extends RequestOptionalParams {
  userIds: Array<string | number>;
  fields: UserFieldType[];
  nameCase?: NameCaseType;
}

export type GetMethod = (options: GetMethodOptions) => Promise<User[]>

export interface UsersRepositoryInterface {
  // https://vk.com/dev/users.get
  get: GetMethod;
}
