/**
 * @see https://vk.com/dev/downloadedGames.getPaidStatus
 */
export interface IGetPaidStatusParams {
  user_id: number;
}

export interface IGetPaidStatusResult {
  is_paid: boolean;
}
