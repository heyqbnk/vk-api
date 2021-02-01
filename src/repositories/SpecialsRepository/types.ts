import {IPager} from '../../types';

type TStickersPager = IPager<{
  stickerId: number;
  isPurchased: boolean;
}>

export interface IAddStickersParams {
  userIds: (number | string)[];
  packId: number;
  text: string;
  stickerIds?: number[];
}

export type TAddStickersResult = TStickersPager;

export interface IGetStickersParams {
  userId: number | string;
  packId: number | string;
}

export type TGetStickersResult = TStickersPager;