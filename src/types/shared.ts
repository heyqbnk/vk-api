/**
 * Enum of available languages
 */
export enum LangEnum {
  RU = 0,
  UK = 1,
  BE = 2,
  EN = 3,
  ES = 4,
  FI = 5,
  DE = 6,
  IT = 7
}

/**
 * Type which describes available languages
 * @see https://vk.com/dev/api_requests?f=2.%20Общие%20параметры
 */
export type LangType =
  | 'ru'
  | 'uk'
  | 'be'
  | 'en'
  | 'es'
  | 'fi'
  | 'de'
  | 'it'
  | LangEnum;

/**
 * Pseudo boolean type. Means boolean converted to number
 */
export type PseudoBooleanType = 0 | 1;

/**
 * All boolean types which could be accepted by lib
 */
export type BooleanType = boolean | PseudoBooleanType;

/**
 * Object with fields id and title
 */
export interface IdTitlePair {
  /**
   * Unique identifier
   */
  id: number;

  /**
   * Short name
   */
  title: string;
}

/**
 * Structure representing some pager
 */
export interface Pager<Item> {
  /**
   * Records count
   */
  count: number;

  /**
   * List of records
   */
  items: Item[];
}

/**
 * Shared optional request parameters.
 */
export interface RequestOptionalParams {
  /**
   * Access token
   */
  accessToken?: string;

  /**
   * Language
   * @default "ru"
   */
  lang?: LangType;

  /**
   * API version
   * @default "5.110"
   */
  v?: string;
}

/**
 * Config to execute request
 */
export interface RequestConfig<P extends {} = any> {
  /**
   * API method name
   */
  method: string;

  /**
   * List of params for passed method
   */
  params: P & RequestOptionalParams;
}

/**
 * Function that sends request
 */
export type SendRequest = <P extends {} = any, R = any>(
  config: RequestConfig<P>,
) => Promise<R>;

/**
 * Describes repository method
 */
export type RepositoryMethod<P extends {} = any, R = any> = (
  params: P & RequestOptionalParams,
) => Promise<R>;
