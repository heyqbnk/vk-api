import {SendRequest, ProcessRequestConfig} from './types';
import createEventEmitter from 'event-emitter';

interface RequestsQueueConstructorProps {
  requestsPerSecond: number;
  sendRequest: SendRequest;
}

interface Request {
  config: ProcessRequestConfig;
  pointer: symbol;
}

const REQUEST_PERFORMED = 'request-performed';

/**
 * Queue of requests
 */
export class RequestsQueue {
  /**
   * Timeout between requests
   */
  private readonly requestsTimeout: number;

  /**
   * List of requests to perform
   */
  private requests: Request[] = [];

  /**
   * Flag which means queue is performing request
   * @type {boolean}
   */
  private isChecking = false;

  /**
   * Executes request via http
   */
  private readonly sendRequest: SendRequest;

  /**
   * Event emitter
   * @type {ee.Emitter}
   */
  private readonly eventEmitter = createEventEmitter();

  public constructor(props: RequestsQueueConstructorProps) {
    const {requestsPerSecond, sendRequest} = props;

    this.requestsTimeout = Math.round(1000 / requestsPerSecond + 50);
    this.sendRequest = sendRequest;
  }

  /**
   * Checks if there are requests to perform in queue. If there are, performs
   * them
   */
  private async runChecker() {
    // If check is already ran or no request to perform, skip
    if (this.isChecking || this.requests.length === 0) {
      return;
    }
    // Set flag check is running
    this.isChecking = true;

    // Calculate when checker will be able to check again
    const availableAfterMs = this.requests.length * this.requestsTimeout;

    // For each request create a promise with timeout
    const promises = this.requests.map((r, idx) => {
      return new Promise(res => {
        setTimeout(async () => {
          const {pointer, config} = r;
          let error: Error | null = null;
          let data: any = null;

          try {
            // Execute request
            data = await this.sendRequest(config);
          } catch (e) {
            error = e;
          }
          // Emit event that request was performed
          this.eventEmitter.emit(REQUEST_PERFORMED, pointer, error, data);

          // Remove request from queue
          this.requests.splice(this.requests.indexOf(r), 1);
          res();
        }, idx * this.requestsTimeout);
      });
    });

    // Add promise which will release checker from pause and will safely allow
    // to perform next request
    promises.push(new Promise(res => setTimeout(res, availableAfterMs)));

    // Wait for requests to be performed
    await Promise.all(promises);

    this.isChecking = false;

    // If there are still requests to perform, run checker again
    if (this.requests.length > 0) {
      this.runChecker();
    }
  }

  /**
   * Adds new request to perform. Returns its pointer
   */
  public add<T>(config: ProcessRequestConfig): Promise<T> {
    const pointer = Symbol();

    // Add request to queue
    this.requests.push({pointer, config});

    // Run queue checker
    this.runChecker();

    return new Promise<T>((res, rej) => {
      const listener = (ptr: symbol, error: Error | null, data: T) => {
        if (pointer !== ptr) {
          return;
        }
        // Remove this event listener due to request was performed
        this.eventEmitter.off(REQUEST_PERFORMED, listener);

        if (error) {
          return rej(error);
        }
        res(data);
      };

      // Wait for request to be performed
      this.eventEmitter.on(REQUEST_PERFORMED, listener);
    });
  }
}
