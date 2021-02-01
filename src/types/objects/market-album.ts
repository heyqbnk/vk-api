import {IObjectSharedProps} from './shared';
import {IPhoto} from './photo';

/**
 * @see https://vk.com/dev/objects/market_album
 */
export interface IMarketAlbum extends IObjectSharedProps {
  title: string;
  photo: IPhoto;
  count: number;
  updatedTime: number;
}
