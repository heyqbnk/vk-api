import {IPager} from '../../types';

export enum EGiftPrivacy {
  NameAndMessagePublic,
  NamePublicMessagePrivate,
  NameAndMessagePrivate,
}

/**
 * @see https://vk.com/dev/gifts.get
 */
export interface IGetParams {
  user_id?: number;
  count?: number;
  offset?: number;
}

export type TGetResult = IPager<{
  id: number;
  from_id: number;
  message: string;
  date: number;
  gift: {
    id: number;
    thumb_256: string;
    thumb_96: string;
    thumb_48: string;
  };
  privacy: EGiftPrivacy;
  gift_hash: string;
}>;
