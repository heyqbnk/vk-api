import {
  Photo,
  ObjectSharedProps,
  Video,
  Audio,
  Doc,
  Link,
  Note,
  Poll,
  Page,
  MarketItem,
  MarketItemExtended,
  MarketAlbum,
  Sticker,
  Image,
  Button,
} from './objects';

/**
 * List of member status values for event attachment
 */
export enum EventAttachmentMemberStatusEnum {
  SureJoin,
  MaybeJoin,
  NotJoin
}

/**
 * Type which generates new attachments
 * @see https://vk.com/dev/objects/attachments_w
 */
type GenericAttachment<T extends string, Item = any> = {
  type: T;
} & { [key in T]: Item };

export type PhotoAttachment = GenericAttachment<'photo', Photo>;
export type PostedPhotoAttachment = GenericAttachment<'posted_photo', ObjectSharedProps & {
  photo130: string;
  photo604: string;
}>;
export type VideoAttachment = GenericAttachment<'video', Video>;
export type AudioAttachment = GenericAttachment<'audio', Audio>;
export type DocAttachment = GenericAttachment<'doc', Doc>;
export type GraffitiAttachment = GenericAttachment<'graffiti', ObjectSharedProps & {
  photo130: string;
  photo604: string;
}>
export type LinkAttachment = GenericAttachment<'link', Link>;
export type NoteAttachment = GenericAttachment<'note', Note>;
export type AppAttachment = GenericAttachment<'app', ObjectSharedProps & {
  id: number;
  name: string;
  photo130: string;
  photo604: string;
}>
export type PollAttachment = GenericAttachment<'poll', Poll>;
export type PageAttachment = GenericAttachment<'page', Page>;
export type AlbumAttachment = GenericAttachment<'album', ObjectSharedProps & {
  thumb: Photo;
  title: string;
  description: string;
  created: number;
  updated: number;
  size: number;
}>;
export type PhotosListAttachment = GenericAttachment<'photos_list', number[]>;
export type MarketItemAttachment = GenericAttachment<'market', MarketItem | MarketItemExtended>;
export type MarketAlbumAttachment = GenericAttachment<'market_album', MarketAlbum>
export type StickerAttachment = GenericAttachment<'sticker', Sticker>;
export type PrettyCardsAttachment = GenericAttachment<'pretty_cards', {
  cards: Array<{
    cardId: number;
    linkUrl: string;
    title: string;
    images: Image[];
    button: Button;
    price: number;
    priceOld: number;
  }>;
}>;
export type EventAttachment = GenericAttachment<'event', {
  id: number;
  time: number;
  memberStatus: EventAttachmentMemberStatusEnum;
  isFavorite: boolean;
  address: string;
  text: string;
  buttonText: string;
  friends: number[];
}>;

/**
 * Attachment type
 */
export type AttachmentType =
  | PhotoAttachment
  | PostedPhotoAttachment
  | VideoAttachment
  | AudioAttachment
  | DocAttachment
  | GraffitiAttachment
  | LinkAttachment
  | NoteAttachment
  | AppAttachment
  | PollAttachment
  | PageAttachment
  | AlbumAttachment
  | PhotosListAttachment
  | MarketItemAttachment
  | MarketAlbumAttachment
  | StickerAttachment
  | PrettyCardsAttachment
  | EventAttachment;
