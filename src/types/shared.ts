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

export interface RequestOptionalParams {
  /**
   * Access token
   */
  accessToken?: string;

  /**
   * Language
   */
  lang?: LangType;

  /**
   * API version
   */
  v?: string;
}

/**
 * Pseudo boolean type
 */
export type PseudoBooleanType = 0 | 1;

/**
 * Config to perform request
 */
export interface ProcessRequestConfig {
  method: string;
  options: object;
}

export type ProcessRequest = <T>(config: ProcessRequestConfig) => Promise<T>;
export type SendRequest = ProcessRequest;
