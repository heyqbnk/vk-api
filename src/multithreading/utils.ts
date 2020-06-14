import {VKAPIMessage} from './types';

/**
 * States if value is non-null object
 * @param value
 * @returns {value is object}
 */
export function isNonNullObject(value: any): value is Record<any, any> {
  return typeof value === 'object' && value !== null;
}

/**
 * States is value extends VKAPIMessage
 * @param value
 * @returns {value is VKAPIMessage & Record<any, any>}
 */
export function extendsVKAPIMessage(
  value: any,
): value is VKAPIMessage & Record<any, any> {
  return isNonNullObject(value) &&
    typeof value.processId === 'number' &&
    typeof value.requestId === 'string' &&
    value.isVKAPIMessage === true;
}
