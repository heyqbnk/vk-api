import {IQueueConstructorProps} from './types';

/**
 * Class which represents calls queue. It is important to understand that
 * this class purpose is not to perform http requests or something like
 * that. The main its purpose is to send signals when something can be called
 * according to passed timeout.
 */
export class Queue {
  /**
   * States when queue is free.
   * @type {number | null}
   */
  freeAt: number | null = null;
  /**
   * Timeout between queue calls.
   * @type {number}
   * @private
   */
  private readonly timeout: number;

  constructor(props: IQueueConstructorProps) {
    const {timeout} = props;
    this.timeout = timeout;
  }

  async await(): Promise<void> {
    const now = Date.now();

    if (this.freeAt === null || this.freeAt < now) {
      this.freeAt = now + this.timeout;
      return;
    }
    const timeout = this.freeAt - now;
    this.freeAt += this.timeout;

    return new Promise<void>(res => setTimeout(res, timeout));
  }
}