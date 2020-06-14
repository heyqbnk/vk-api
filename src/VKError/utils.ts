import {VKError} from './VKError';

/**
 * States if value is VKError
 * @param value
 * @returns {value is VKError}
 */
export function isVKError(value: any): value is VKError {
  return value instanceof Error && 'data' in value;
}
