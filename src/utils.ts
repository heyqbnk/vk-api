/**
 * Converts value to VKontakte API query compatible format
 * @param value
 * @returns {string}
 */
import {toSnakeCase} from './VKAPI';

export function stringifyValue(value: any): string {
  if (Array.isArray(value)) {
    return value.map(stringifyValue).join(',');
  }

  if (typeof value === 'object') {
    return Object.keys(value)
      .map(key => `${key}=${stringifyValue(value[key])}`)
      .join('&');
  }

  return escape(String(value));
}

/**
 * Creates query converting camel case field names to snake case
 * @param {Record<string, any>} query
 * @returns {string}
 */
export function formatQuery(query: Record<string, any>): string {
  return Object.keys(query).reduce<string>((acc, key, idx) => {
    if (idx !== 0) {
      acc += '&';
    }
    return `${acc}${toSnakeCase(key)}=${stringifyValue(query[key])}`;
  }, '');
}
