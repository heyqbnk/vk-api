import {IVKAPI} from '../../VKAPI';

export interface IVKAPIConsumerConstructorProps {
  /**
   * Required to avoid collisions in master messages handling. Should be
   * equal to tunnelName of its target VKAPIProvider.
   * @default ""
   */
  tunnelName?: string;
  /**
   * Instance of VKAPI which performs requests.
   */
  instance: IVKAPI;
}
