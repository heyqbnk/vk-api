import {IErrorInfo, IVKErrorConstructorProps} from './types';
import {IRequestConfig} from '../types';
import {isNonNullObject} from '../utils';

const ERROR_NAME = 'VKError';

/**
 * Represents an error sent from VKontakte.
 */
export class VKError extends Error {
  /**
   * Error sent from VKontakte.
   * @type {IErrorInfo}
   */
  errorInfo: IErrorInfo;
  /**
   * Config with which request was performed.
   * @type {IRequestConfig}
   */
  config: IRequestConfig;

  constructor(props: IVKErrorConstructorProps) {
    super(JSON.stringify(props.errorInfo));
    const {errorInfo, config} = props;
    this.errorInfo = errorInfo;
    this.config = config;
    this.name = ERROR_NAME;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VKError);
    }
  }
}

/**
 * Define instanceof check.
 */
Object.defineProperty(VKError, Symbol.hasInstance, {
  value: (obj: any) => isNonNullObject(obj) &&
    obj.name === ERROR_NAME &&
    isNonNullObject(obj.data),
});
