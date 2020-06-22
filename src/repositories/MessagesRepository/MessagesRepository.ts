import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {SendParams, SendResult} from './types';

export class MessagesRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('messages', sendRequest);
  }

  public send = this.r<SendParams, SendResult>(
    'send',
    ({randomId, ...rest}) => ({
      ...rest,
      randomId: typeof randomId === 'undefined'
        ? Math.floor(Math.random() * 10000000)
        : randomId,
    }),
  );
}
