import {MessageTypeEnum, VKAPIProcessRequestMessage} from '../types';

/**
 * States if message is VKAPIProcessRequestMessage
 * @param message
 * @returns {message is VKAPIProcessRequestMessage}
 */
export function isVKAPIProcessRequestMessage(
  message: any,
): message is VKAPIProcessRequestMessage {
  return typeof message === 'object'
    && typeof message.processId === 'number'
    && typeof message.requestId === 'string'
    && message.isVKAPIMessage === true
    && message.type === MessageTypeEnum.ProcessRequest
    && typeof message.config === 'object'
    && typeof message.config.method === 'string'
    && typeof message.config.options === 'object';
}
