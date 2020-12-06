import {Pager} from '../../types';

export interface IAddStickersParams {
  userIds: (number | string)[];
  packId: number;
  text: string;
  stickerIds: number[];
}

export interface IAddStickersResult {

}

export interface IGetStickersParams {
  userId: number | string;
  packId: number | string;
}

export type TGetStickersResult = Pager<{
  stickerId: number;
  isPurchased: boolean;
}>