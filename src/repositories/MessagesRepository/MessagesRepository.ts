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
    ({randomId: _randomId, ...rest}) => {
      const randomId = typeof _randomId === 'undefined'
        ? Math.floor(Math.random() * 10000000)
        : _randomId;

      if ('userIds' in rest) {
        return {
          ...rest,
          userIds: formatOptionalArray(rest.userIds),
          randomId,
        };
      }

      return {...rest, randomId};
    },
  );
}
