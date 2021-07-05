import {
  IPhoto,
  IObjectSharedProps,
  IVideo,
  IAudio,
  IDoc,
  ILink,
  INote,
  IPoll,
  IPage,
  IMarketItem,
  IMarketItemExtended,
  IMarketAlbum,
  ISticker,
  IImage,
  IButton,
} from './objects';

/**
 * List of member status values for event attachment.
 */
export enum EEventAttachmentMemberStatus {
  SureJoin,
  MaybeJoin,
  NotJoin
}

/**
 * Type which generates new attachments.
 * @see https://vk.com/dev/objects/attachments_w
 */
type TGenericAttachment<T extends string, Item = any> = {
  type: T;
} & { [key in T]: Item };

export type TPhotoAttachment = TGenericAttachment<'photo', IPhoto>;
export type TPostedPhotoAttachment = TGenericAttachment<'posted_photo', IObjectSharedProps & {
  photo_130: string;
  photo_604: string;
}>;
export type TVideoAttachment = TGenericAttachment<'video', IVideo>;
export type TAudioAttachment = TGenericAttachment<'audio', IAudio>;
export type TDocAttachment = TGenericAttachment<'doc', IDoc>;
export type TGraffitiAttachment = TGenericAttachment<'graffiti', IObjectSharedProps & {
  photo_130: string;
  photo_604: string;
}>
export type TLinkAttachment = TGenericAttachment<'link', ILink>;
export type TNoteAttachment = TGenericAttachment<'note', INote>;
export type TAppAttachment = TGenericAttachment<'app', IObjectSharedProps & {
  id: number;
  name: string;
  photo_130: string;
  photo_604: string;
}>
export type TPollAttachment = TGenericAttachment<'poll', IPoll>;
export type TPageAttachment = TGenericAttachment<'page', IPage>;
export type TAlbumAttachment = TGenericAttachment<'album', IObjectSharedProps & {
  thumb: IPhoto;
  title: string;
  description: string;
  created: number;
  updated: number;
  size: number;
}>;
export type TPhotosListAttachment = TGenericAttachment<'photos_list', number[]>;
export type TMarketItemAttachment = TGenericAttachment<'market', IMarketItem | IMarketItemExtended>;
export type TMarketAlbumAttachment = TGenericAttachment<'market_album', IMarketAlbum>
export type TStickerAttachment = TGenericAttachment<'sticker', ISticker>;
export type TPrettyCardsAttachment = TGenericAttachment<'pretty_cards', {
  cards: Array<{
    card_id: number;
    link_url: string;
    title: string;
    images: IImage[];
    button: IButton;
    price: number;
    price_old: number;
  }>;
}>;
export type TEventAttachment = TGenericAttachment<'event', {
  id: number;
  time: number;
  member_status: EEventAttachmentMemberStatus;
  is_favorite: boolean;
  address: string;
  text: string;
  button_text: string;
  friends: number[];
}>;

/**
 * Any attachment.
 */
export type TAttachment =
  | TPhotoAttachment
  | TPostedPhotoAttachment
  | TVideoAttachment
  | TAudioAttachment
  | TDocAttachment
  | TGraffitiAttachment
  | TLinkAttachment
  | TNoteAttachment
  | TAppAttachment
  | TPollAttachment
  | TPageAttachment
  | TAlbumAttachment
  | TPhotosListAttachment
  | TMarketItemAttachment
  | TMarketAlbumAttachment
  | TStickerAttachment
  | TPrettyCardsAttachment
  | TEventAttachment;
