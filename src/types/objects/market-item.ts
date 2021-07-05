import {IObjectSharedProps} from './shared';
import {IPhoto} from './photo';
import {TPseudoBoolean} from '../shared';

/**
 * List of market availability statuses
 * @see https://vk.com/dev/objects/market_item
 */
export enum EMarketItemAvailability {
  Available,
  Deleted,
  Unavailable,
}

/**
 * @see https://vk.com/dev/objects/market_item
 */
export interface IMarketItem extends IObjectSharedProps {
  title: string;
  description: string;
  price: {
    amount: number;
    currency: {
      id: number;
      name: string;
    };
    old_amount: number;
    text: string;
  };
  category: {
    id: number;
    name: string;
    section: {
      id: number;
      name: string;
    };
  };
  thumb_photo: string;
  date: number;
  availability: EMarketItemAvailability;
  is_favorite: boolean;
}

/**
 * @see https://vk.com/dev/objects/market_item
 */
export interface IMarketItemExtended extends IMarketItem {
  photos: IPhoto[];
  can_comment: TPseudoBoolean;
  can_repost: TPseudoBoolean;
  likes: {
    user_likes: TPseudoBoolean;
    count: number;
  };
  url: string;
  button_title: string;
}
