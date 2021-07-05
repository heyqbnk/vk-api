/**
 * @see https://vk.com/dev/auth.restore
 */
export interface IRestoreParams {
  phone: string;
  last_name: string;
}

export interface IRestoreResult {
  success: 1;
  sid: string;
}
