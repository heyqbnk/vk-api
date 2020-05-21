import {toSnakeCase} from './VKAPI';
import {stringify} from 'querystring';

/**
 * Creates query converting camel case field names to snake case
 * @param {Record<string, any>} query
 * @returns {string}
 */
export function formatQuery(query: Record<string, any>): string {
  const preparedObject = Object
    .keys(query)
    .reduce<Record<string, any>>((acc, key) => {
      acc[toSnakeCase(key)] = Array.isArray(query[key])
        ? query[key].join(',')
        : query[key];

      return acc;
    }, {});

  return stringify(preparedObject);
}
