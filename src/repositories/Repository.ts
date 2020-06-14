import {SendRequest} from '../types';

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
}
