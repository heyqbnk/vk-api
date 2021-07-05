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
  screen_name: string;
  is_closed: ECommunityPrivacy;
  deactivated?: 'deleted' | 'banned';
  is_admin?: TPseudoBoolean;
  admin_level?: ECommunityAdminLevel;
  is_member?: TPseudoBoolean;
  is_advertiser?: TPseudoBoolean;
  invited_by?: number;
  type: 'group' | 'page' | 'event';
  photo_50: string;
  photo_100: string;
  photo_200: string;
  activity?: string;
  addresses?: {
    is_enabled: boolean;
    main_address_id: number;
  };
  age_limits?: ECommunityAgeLimits;
  ban_info?: {
    end_date: number;
    comment: string;
  };
  can_create_topic?: TPseudoBoolean;
  can_message?: TPseudoBoolean;
  can_post?: TPseudoBoolean;
  can_see_all_posts?: TPseudoBoolean;
  can_upload_doc?: TPseudoBoolean;
  can_upload_video?: TPseudoBoolean;
  city?: IIdTitlePair;
  contacts?: {
    user_id: number;
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
  crop_photo?: ICropPhoto;
  description?: string;
  fixed_post?: number;
  has_photo?: TPseudoBoolean;
  is_favorite?: TPseudoBoolean;
  is_hidden_from_feed?: TPseudoBoolean;
  is_messages_blocked?: TPseudoBoolean;
  links?: {
    id: number;
    url: string;
    name: string;
    desc: string;
    photo_50: string;
    photo_100: string;
  }[];
  main_album_id?: number;
  main_section?: ECommunitySection;
  market?: {
    enabled: 0;
  } | {
    enabled: 1;
    type: 'basic' | 'advanced';
    price_min: number;
    price_max: number;
    main_album_id: number;
    contact_id: number;
    currency: {
      id: number;
      name: string;
    };
    currency_text: string;
  };
  member_status?: ECommunityMemberStatus;
  members_count?: number;
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