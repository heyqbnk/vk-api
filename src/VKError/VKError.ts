import {IErrorInfo, IVKErrorConstructorProps} from './types';
import {IRequestConfig} from '../types';

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
    super(props.errorInfo.error_msg);
    const {errorInfo, config} = props;
    this.errorInfo = errorInfo;
    this.config = config;
    this.name = ERROR_NAME;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VKError);
    }
    Object.setPrototypeOf(this, VKError.prototype);
  }
}
