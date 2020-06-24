import {ObjectSharedProps} from './shared';
import {Photo} from './photo';
import {PseudoBooleanType} from '../shared';

/**
 * List of market availability statuses
 * @see https://vk.com/dev/objects/market_item
 */
export enum MarketItemAvailabilityEnum {
  Available,
  Deleted,
  Unavailable,
}

/**
 * @see https://vk.com/dev/objects/market_item
 */
export interface MarketItem extends ObjectSharedProps {
  title: string;
  description: string;
  price: {
    amount: number;
    currency: {
      id: number;
      name: string;
    };
    oldAmount: number;
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
  thumbPhoto: string;
  date: number;
  availability: MarketItemAvailabilityEnum;
  isFavorite: boolean;
}

/**
 * @see https://vk.com/dev/objects/market_item
 */
export interface MarketItemExtended extends MarketItem {
  photos: Photo[];
  canComment: PseudoBooleanType;
  canRepost: PseudoBooleanType;
  likes: {
    userLikes: PseudoBooleanType;
    count: number;
  };
  url: string;
  buttonTitle: string;
}
