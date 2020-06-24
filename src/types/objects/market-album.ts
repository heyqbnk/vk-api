import {ObjectSharedProps} from './shared';
import {Photo} from './photo';

/**
 * @see https://vk.com/dev/objects/market_album
 */
export interface MarketAlbum extends ObjectSharedProps {
  title: string;
  photo: Photo;
  count: number;
  updatedTime: number;
}
