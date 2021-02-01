import {IVKAPIRequestPerformAllowedMessage} from '../types';
import {isVKAPIMessage} from '../utils';
import {REQUEST_PERFORM_ALLOWED_EVENT} from '../constants';

/**
 * States if message is IVKAPIRequestPerformAllowedMessage.
 * @param message
 * @returns {message is IVKAPIRequestPerformAllowedMessage}
 */
export function isVKAPIRequestPerformAllowedMessage(
  message: any,
): message is IVKAPIRequestPerformAllowedMessage {
  return isVKAPIMessage(message) &&
    message.type === REQUEST_PERFORM_ALLOWED_EVENT;
}