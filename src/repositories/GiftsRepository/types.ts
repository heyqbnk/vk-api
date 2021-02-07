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
  userId?: number;
  count?: number;
  offset?: number;
}

export type TGetResult = IPager<{
  id: number;
  fromId: number;
  message: string;
  date: number;
  gift: {
    id: number;
    thumb256: string;
    thumb96: string;
    thumb48: string;
  };
  privacy: EGiftPrivacy;
  giftHash: string;
}>;
