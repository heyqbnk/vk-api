/**
 * Converts text to snake case
 * @param {string} text
 * @returns {string}
 */
export function toSnakeCase(text: string): string {
  return text.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
}

/**
 * Converts text to camelcase
 * @param {string} text
 * @returns {string}
 */
export function toCamelCase(text: string): string {
  return text.replace(/_./g, match => match.slice(1).toUpperCase());
}

/**
 * Recursively converts all object keys to camel case
 * @param value
 * @returns {any}
 */
export function recursiveToCamelCase(value: any): any {
  if (value === null) {
    return null;
  }
  if (Array.isArray(value)) {
    return value.map(recursiveToCamelCase);
  }
  if (typeof value === 'object') {
    return Object.keys(value).reduce<Record<string, any>>((acc, key) => {
      acc[toCamelCase(key)] = value[key];
      return acc;
    }, {});
  }
  return value;
}
