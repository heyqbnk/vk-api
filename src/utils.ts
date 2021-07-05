import {TAnyRecord, TBoolean, TPseudoBoolean} from './types';

/**
 * Converts boolean to pseudo boolean type.
 * @param {boolean} value
 * @returns {TPseudoBoolean}
 */
export function toPseudoBoolean(value: boolean): TPseudoBoolean {
  return value ? 1 : 0;
}

/**
 * Converts optional boolean type to TPseudoBoolean or undefined.
 * @param {boolean | undefined} value
 * @returns {TPseudoBoolean | undefined}
 */
export function formatOptionalBoolean(
  value: TBoolean | undefined,
): TPseudoBoolean | undefined {
  return typeof value === 'undefined'
    ? undefined
    : (typeof value === 'boolean' ? toPseudoBoolean(value) : value);
}

/**
 * Converts optional array of strings or numbers to string or undefined
 * @param {Array<string | number> | undefined} arr
 * @returns {string | undefined}
 */
export function formatOptionalArray(
  arr: Array<string | number> | undefined,
): string | undefined {
  return typeof arr === 'undefined' ? arr : arr.join(',');
}

/**
 * States if value is non-null object.
 * @param value
 * @returns {value is Record<string, unknown>}
 */
export function isRecord(value: any): value is TAnyRecord {
  return typeof value === 'object' && value !== null;
}
