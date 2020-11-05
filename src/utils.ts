import {BooleanType, PseudoBooleanType} from './types';

/**
 * Function that formats string to some format
 */
type TextFormatter = (text: string) => string;

/**
 * Returns function which formats any value with passed text formatter
 * @param {TextFormatter} formatKey
 * @returns {(value: any) => any}
 */
function createRecursiveKeysFormatter(formatKey: TextFormatter) {
  const formatter = (value: any): any => {
    if (value === null) {
      return null;
    }
    if (Array.isArray(value)) {
      return value.map(formatter);
    }
    if (typeof value === 'object') {
      return Object.keys(value).reduce<Record<string, any>>((acc, key) => {
        acc[formatKey(key)] = formatter(value[key]);
        return acc;
      }, {});
    }
    return value;
  };

  return formatter;
}

/**
 * Converts text to snake case
 * @param {string} text
 * @returns {string}
 */
export function toSnakeCase(text: string): string {
  return text.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
}

export const recursiveToSnakeCase = createRecursiveKeysFormatter(toSnakeCase);

/**
 * Converts text to camel case
 * @param {string} text
 * @returns {string}
 */
export function toCamelCase(text: string): string {
  return text.replace(/_./g, match => match.slice(1).toUpperCase());
}

export const recursiveToCamelCase = createRecursiveKeysFormatter(toCamelCase);

/**
 * Converts boolean to pseudo boolean type
 * @param {boolean} value
 * @returns {PseudoBooleanType}
 */
export function toPseudoBoolean(value: boolean): PseudoBooleanType {
  return value ? 1 : 0;
}

/**
 * Converts optional boolean type to PseudoBooleanType or undefined
 * @param {boolean | undefined} value
 * @returns {PseudoBooleanType | undefined}
 */
export function formatOptionalBoolean(
  value: BooleanType | undefined,
): PseudoBooleanType | undefined {
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
