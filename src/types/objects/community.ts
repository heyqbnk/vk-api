import {IIdTitlePair, TPseudoBoolean} from '../shared';
import {ICropPhoto} from '../misc';

export enum ECommunityPrivacy {
  Open ,
  Closed,
  Private,
}

export enum ECommunityAdminLevel {
  Moderator = 1,
  Editor,
  Admin,
}

export enum ECommunityAgeLimits {
  None = 1,
  Plus16 ,
  Plus18,
}

export enum ECommunitySection {
  None,
  Photos,
  Discussions,
  Audios,
  Videos,
  Goods,
}

export enum ECommunityMemberStatus {
  NotMember,
  IsMember,
  NotSureWillVisit,
  DeclinedInvite,
  RequestSent,
  Invited,
}

export enum ECommunityWallPrivacy {
  Disabled,
  Open,
  Restricted,
  Closed,
}

/**
 * @see https://vk.com/dev/objects/group
 */
export interface ICommunity {
  id: number;
  name: string;
  screenName: string;
  isClosed: ECommunityPrivacy;
  deactivated?: 'deleted' | 'banned';
  isAdmin?: TPseudoBoolean;
  adminLevel?: ECommunityAdminLevel;
  isMember?: TPseudoBoolean;
  isAdvertiser?: TPseudoBoolean;
  invitedBy?: number;
  type: 'group' | 'page' | 'event';
  photo50: string;
  photo100: string;
  photo200: string;
  activity?: string;
  addresses?: {
    isEnabled: boolean;
    mainAddressId: number;
  };
  ageLimits?: ECommunityAgeLimits;
  banInfo?: {
    endDate: number;
    comment: string;
  };
  canCreateTopic?: TPseudoBoolean;
  canMessage?: TPseudoBoolean;
  canPost?: TPseudoBoolean;
  canSeeAllPosts?: TPseudoBoolean;
  canUploadDoc?: TPseudoBoolean;
  canUploadVideo?: TPseudoBoolean;
  city?: IIdTitlePair;
  contacts?: {
    userId: number;
    desc: string;
    phone: string;
    email: string;
  }[];
  counters?: {
    photos: number;
    albums: number;
    audios: number;
    videos: number;
    topics: number;
    docs: number;
  };
  country?: IIdTitlePair;
  cover?: {
    enabled: TPseudoBoolean;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
  cropPhoto?: ICropPhoto;
  description?: string;
  fixedPost?: number;
  has_photo?: TPseudoBoolean;
  isFavorite?: TPseudoBoolean;
  isHiddenFromFeed?: TPseudoBoolean;
  isMessagesBlocked?: TPseudoBoolean;
  links?: {
    id: number;
    url: string;
    name: string;
    desc: string;
    photo50: string;
    photo100: string;
  }[];
  mainAlbumId?: number;
  mainSection?: ECommunitySection;
  market?: {
    enabled: 0;
  } | {
    enabled: 1;
    type: 'basic' | 'advanced';
    priceMin: number;
    priceMax: number;
    mainAlbumId: number;
    contactId: number;
    currency: {
      id: number;
      name: string;
    };
    currencyText: string;
  };
  memberStatus?: ECommunityMemberStatus;
  membersCount?: number;
  place?: {
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    type: string;
    country: number;
    city: number;
    address: string;
  };
  public_date_label?: string;
  site?: string;
  start_date?: number;
  finish_date?: number;
  status?: string;
  trending?: TPseudoBoolean;
  verified?: TPseudoBoolean;
  wall?: ECommunityWallPrivacy;
  wikiPage?: string;
}