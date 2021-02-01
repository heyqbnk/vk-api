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
  availability: EMarketItemAvailability;
  isFavorite: boolean;
}

/**
 * @see https://vk.com/dev/objects/market_item
 */
export interface IMarketItemExtended extends IMarketItem {
  photos: IPhoto[];
  canComment: TPseudoBoolean;
  canRepost: TPseudoBoolean;
  likes: {
    userLikes: TPseudoBoolean;
    count: number;
  };
  url: string;
  buttonTitle: string;
}
