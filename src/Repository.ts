import {ProcessRequest} from './types';

export interface RepositoryConstructorProps {
  /**
   * Handler which processes request
   */
  processRequest: ProcessRequest;
  /**
   * Repository name
   */
  name: string;
}

/**
 * Abstract class to create new repositories
 */
export abstract class Repository {
  protected processRequest: ProcessRequest;

  protected constructor(props: RepositoryConstructorProps) {
    const {processRequest, name} = props;

    this.processRequest = options => processRequest({
      ...options,
      method: `${name}.${options.method}`,
    });
  }
}
