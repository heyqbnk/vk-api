import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IGetCommentsParams,
  IGetCommentsResult,
  IGetPagesParams,
  IGetPagesResult,
} from './types';
import {formatOptionalArray} from '../../utils';

export class WidgetsRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('widget', sendRequest);
  }

  /**
   * @see https://vk.com/dev/widgets.getComments
   */
  getComments = this.r<IGetCommentsParams, IGetCommentsResult>(
    'getComments',
    ({fields, ...rest}) => ({
      ...rest,
      fields: formatOptionalArray(fields),
    }),
  );

  /**
   * @see https://vk.com/dev/widgets.getPages
   */
  getPages = this.r<IGetPagesParams, IGetPagesResult>('getPages');
}
