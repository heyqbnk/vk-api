import {IVKAPIMessage} from './types';
import {isRecord} from '../utils';

/**
 * States is value extends VKAPIMessage.
 * @param value
 * @returns {value is VKAPIMessage & Record<string, unknown>}
 */
export function isVKAPIMessage(
  value: any,
): value is IVKAPIMessage & Record<string, unknown> {
  return isRecord(value) &&
    typeof value.tunnelName === 'string' &&
    typeof value.requestId === 'string' &&
    value.isVKAPIMessage === true;
}
