import {Worker} from 'cluster';

export interface IVKAPIProviderConstructorProps {
  /**
   * Slave threads which should communicate with master thread.
   */
  workers: Worker[];
  /**
   * Tunnel name. Required to avoid collisions appearing while
   * several different masters are created and catching the same message
   * from one slave.
   * @default ""
   */
  tunnelName?: string;
  /**
   * Max process event listeners count. Required in case, you are getting
   * warning about possible memory leak.
   */
  maxProcessEventListenersCount?: number;
  /**
   * Requests per second, provider can perform.
   * @default 3
   */
  rps?: number;
}
