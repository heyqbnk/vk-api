export interface VKAPISlaveConstructorProps {
  /**
   * Required to avoid collisions in master messages handling. Should be
   * equal to tunnelName of its target VKAPIMaster
   * @default ""
   */
  tunnelName?: string;
}
