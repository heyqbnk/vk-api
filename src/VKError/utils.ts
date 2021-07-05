import {VKError} from './VKError';
import {IErrorInfo} from './types';
import {isRecord} from '../utils';

/**
 * States that value is VKError.
 * @param value
 * @returns {value is VKError}
 */
export function isVKError(value: any): value is VKError {
  return value instanceof VKError;
}

/**
 * States that value is error information.
 * @param value
 */
export function isErrorInfo(value: any): value is IErrorInfo {
  return isRecord(value) &&
    typeof value.error_code === 'number' &&
    typeof value.error_msg === 'string' &&
    Array.isArray(value.request_params) &&
    value.request_params.every(item => {
      return isRecord(item) &&
        typeof item.key === 'string' &&
        typeof item.value === 'string';
    });
}