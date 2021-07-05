import {isErrorInfo, VKError} from '../VKError';
import {IRequestConfig, TAnyRecord} from '../types';

/**
 * States that value is Record.
 * @param value
 */
function isRecord(value: any): value is TAnyRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Checks if response format is correct.
 * @param response
 * @param config
 */
export function validateResponse(response: any, config: IRequestConfig) {
  if (isRecord(response)) {
    if ('response' in response) {
      return response.response;
    }

    if ('error' in response && isErrorInfo(response.error)) {
      throw new VKError({errorInfo: response.error, config});
    }
  }
  // In case, response from server is incorrect, throw error.
  throw new Error('Response from server was incorrect');
}