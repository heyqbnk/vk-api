import {ErrorInfo} from './types';

/**
 * Represents an error sent from VKontakte
 */
export class VKError extends Error {
  /**
   * Contains data error
   */
  public data: ErrorInfo;

  constructor(data: ErrorInfo) {
    super(JSON.stringify(data));
    this.data = data;
  }
}
