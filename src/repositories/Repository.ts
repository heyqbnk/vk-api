import {RepositoryMethod, SendRequest} from '../types';

/**
 * Base class to create repositories
 */
export abstract class Repository {
  /**
   * Function which sends request
   */
  protected readonly sendRequest: SendRequest;

  protected constructor(repoName: string, sendRequest: SendRequest) {
    this.sendRequest = ({method, params}) => sendRequest({
      method: repoName + '.' + method,
      params,
    });
  }

  /**
   * Creates method
   * @param {string} method
   * @param prepare
   * @returns {RepositoryMethod<P, R>}
   */
  protected r<P, R>(
    method: string,
    prepare?: (params: P) => any,
  ): RepositoryMethod<P, R> {
    return params => this.sendRequest({
      method,
      params: prepare ? prepare(params) : params,
    });
  }
}
