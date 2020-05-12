import {Worker} from 'cluster';
import {VKAPIInterface} from '../../VKAPI';

export interface VKAPIMasterConstructorProps {
  /**
   * Slave threads which should communicate with master thread
   */
  threads: Worker[];

  /**
   * API client which performs requests
   */
  client: VKAPIInterface;
}


