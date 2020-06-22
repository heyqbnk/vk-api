import {VKAPIRequestProcessedMessage} from '../types';
import {extendsVKAPIMessage} from '../utils';

/**
 * States if message is VKAPIRequestProcessedMessage
 * @param message
 * @returns {message is VKAPIRequestProcessedMessage}
 */
export function isVKAPIRequestProcessedMessage(
  message: any,
): message is VKAPIRequestProcessedMessage {
  return extendsVKAPIMessage(message) &&
    message.type === 'request-processed' &&
    (typeof message.error !== 'undefined' || message.error === null) &&
    ('data' in message);
}
