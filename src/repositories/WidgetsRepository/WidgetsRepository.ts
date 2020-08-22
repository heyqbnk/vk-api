import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  GetCommentsParams,
  GetCommentsResult,
  GetPagesParams,
  GetPagesResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class WidgetsRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('widget', sendRequest);
  }

  /**
   * @see https://vk.com/dev/widgets.getComments
   * @type {RepositoryMethod<GetCommentsParams, GetCommentsResult>}
   */
  getComments = this.r<GetCommentsParams, GetCommentsResult>(
    'getComments',
    ({fields, ...rest}) => ({
      ...rest,
      fields: formatOptionalArray(fields),
    }),
  );

  /**
   * @see https://vk.com/dev/widgets.getPages
   * @type {RepositoryMethod<GetPagesParams, GetPagesResult>}
   */
  getPages = this.r<GetPagesParams, GetPagesResult>('getPages');
}
