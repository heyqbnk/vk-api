import {Worker} from 'cluster';
import {VKAPIInterface} from '../../VKAPI';

export interface VKAPIMasterConstructorProps {
  /**
   * Slave threads which should communicate with master thread
   */
  workers: Worker[];

  /**
   * API client which performs requests
   */
  instance: VKAPIInterface;

  /**
   * Tunnel name. Required to avoid collisions appearing while
   * several different masters are created and catching the same message
   * from one slave
   * @default ""
   */
  tunnelName?: string;
}
