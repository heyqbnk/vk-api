import {IPager} from '../../types';

type TStickersPager = IPager<{
  sticker_id: number;
  is_purchased: boolean;
}>

export interface IAddStickersParams {
  user_ids: (number | string)[];
  pack_id: number;
  text: string;
  sticker_ids?: number[];
}

export type TAddStickersResult = TStickersPager;

export interface IGetStickersParams {
  user_id: number | string;
  pack_id: number | string;
}

export type TGetStickersResult = TStickersPager;