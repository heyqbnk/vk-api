import {Worker} from 'cluster';
import {VKAPIInterface} from '../../VKAPI';
import {VKAPIMessageBase} from '../types';

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


