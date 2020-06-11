import {
  SendMethod, MessagesRepositoryConstructorProps, MessagesRepositoryInterface,
} from './types';
import {Repository} from '../../Repository';

/**
 * Repository to work with users
 */
export class MessagesRepository extends Repository implements MessagesRepositoryInterface {
  constructor(props: MessagesRepositoryConstructorProps) {
    super({processRequest: props.processRequest, name: 'messages'});
  }

  public send: SendMethod = options => this.processRequest({
    method: 'get',
    options,
  });
}
