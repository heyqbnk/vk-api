import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {TSendParams, TSendResult} from './types';
import {formatOptionalArray} from '../../utils';

export class MessagesRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('messages', sendRequest);
  }

  send = this.r<TSendParams, TSendResult>(
    'send',
    ({random_id: _randomId, ...rest}) => {
      const randomId = typeof _randomId === 'undefined'
        ? Math.floor(Math.random() * 10000000)
        : _randomId;

      if ('user_ids' in rest) {
        return {
          ...rest,
          user_ids: formatOptionalArray(rest.user_ids),
          randomId,
        };
      }

      return {...rest, randomId};
    },
  );
}
