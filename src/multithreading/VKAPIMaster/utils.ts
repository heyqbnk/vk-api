import {VKAPIProcessRequestMessage} from '../types';
import {extendsVKAPIMessage, isNonNullObject} from '../utils';

/**
 * States if message is VKAPIProcessRequestMessage
 * @param message
 * @returns {message is VKAPIProcessRequestMessage}
 */
export function isVKAPIProcessRequestMessage(
  message: any,
): message is VKAPIProcessRequestMessage {
  return extendsVKAPIMessage(message) &&
    message.type === 'process-request' &&
    isNonNullObject(message.config) &&
    typeof message.config.method === 'string' &&
    isNonNullObject(message.config.params);
}
