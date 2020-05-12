import {MessageTypeEnum, VKAPIRequestProcessedMessage} from '../types';

/**
 * States if message is VKAPIRequestProcessedMessage
 * @param message
 * @returns {message is VKAPIRequestProcessedMessage}
 */
export function isVKAPIRequestProcessedMessage(
  message: any,
): message is VKAPIRequestProcessedMessage {
  return typeof message === 'object'
    && typeof message.processId === 'number'
    && typeof message.requestId === 'string'
    && message.isVKAPIMessage === true
    && message.type === MessageTypeEnum.RequestProcessed
    && (message.error instanceof Error || message.error === null)
    && ('data' in message);
}
