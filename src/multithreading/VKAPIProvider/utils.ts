import {IVKAPIMessage, IVKAPIPerformRequestMessage} from '../types';
import {isVKAPIMessage} from '../utils';
import {PERFORM_REQUEST_EVENT} from '../constants';

/**
 * States if message is VKAPIProcessRequestMessage
 * @param message
 * @returns {message is VKAPIProcessRequestMessage}
 */
export function isVKAPIProcessRequestMessage(
  message: IVKAPIMessage,
): message is IVKAPIPerformRequestMessage {
  return isVKAPIMessage(message) && message.type === PERFORM_REQUEST_EVENT;
}
