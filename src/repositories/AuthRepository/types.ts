/**
 * @see https://vk.com/dev/auth.restore
 */
export interface IRestoreParams {
  phone: string;
  lastName: string;
}

export interface IRestoreResult {
  success: 1;
  sid: string;
}
