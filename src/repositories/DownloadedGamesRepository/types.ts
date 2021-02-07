/**
 * @see https://vk.com/dev/downloadedGames.getPaidStatus
 */
export interface IGetPaidStatusParams {
  userId: number;
}

export interface IGetPaidStatusResult {
  isPaid: boolean;
}
