import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {SendParams, SendResult} from './types';
import {formatOptionalArray} from '../../utils';

export class MessagesRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('messages', sendRequest);
  }

  public send = this.r<SendParams, SendResult>(
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
