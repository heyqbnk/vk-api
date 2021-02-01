import {TRepositoryMethod, TSendRequest} from '../types';

/**
 * Base class to create repositories
 */
export abstract class Repository {
  /**
   * Function which sends request
   */
  protected readonly sendRequest: TSendRequest;

  protected constructor(repoName: string, sendRequest: TSendRequest) {
    this.sendRequest = ({method, params}) => sendRequest({
      method: repoName + '.' + method,
      params,
    });
  }

  /**
   * Creates method which sends request.
   * @param {string} method
   * @param prepare
   * @returns {TRepositoryMethod<P, R>}
   */
  protected r<P, R>(
    method: string,
    prepare?: (params: P) => any,
  ): TRepositoryMethod<P, R> {
    return params => this.sendRequest({
      method,
      params: prepare ? prepare(params) : params,
    });
  }
}
