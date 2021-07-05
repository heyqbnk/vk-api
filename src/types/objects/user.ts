import {IIdTitlePair, TPseudoBoolean} from '../shared';
import {IAudio} from './audio';
import {ICropPhoto} from '../misc';

export type TNameCase = 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'abl';
export type TUserField =
  | 'about'
  | 'activities'
  | 'bdate'
  | 'blacklisted'
  | 'books'
  | 'can_post'
  | 'can_see_all_posts'
  | 'can_see_audio'
  | 'can_send_friend_request'
  | 'can_write_private_message'
  | 'career'
  | 'city'
  | 'common_count'
  | 'connections'
  | 'contacts'
  | 'counters'
  | 'country'
  | 'crop_photo'
  | 'domain'
  | 'education'
  | 'first_name_nom'
  | 'first_name_gen'
  | 'first_name_dat'
  | 'first_name_acc'
  | 'first_name_ins'
  | 'first_name_abl'
  | 'followers_count'
  | 'friend_status'
  | 'games'
  | 'has_mobile'
  | 'has_photo'
  | 'home_town'
  | 'interests'
  | 'is_favorite'
  | 'is_friend'
  | 'is_hidden_from_feed'
  | 'last_name_nom'
  | 'last_name_gen'
  | 'last_name_dat'
  | 'last_name_acc'
  | 'last_name_ins'
  | 'last_name_abl'
  | 'last_seen'
  | 'lists'
  | 'maiden_name'
  | 'military'
  | 'movies'
  | 'music'
  | 'nickname'
  | 'occupation'
  | 'online'
  | 'personal'
  | 'photo_50'
  | 'photo_100'
  | 'photo_200_orig'
  | 'photo_200'
  | 'photo_400_orig'
  | 'photo_id'
  | 'photo_max'
  | 'photo_max_orig'
  | 'quotes'
  | 'relatives'
  | 'relation'
  | 'schools'
  | 'screen_name'
  | 'sex'
  | 'site'
  | 'status'
  | 'timezone'
  | 'trending'
  | 'tv'
  | 'universities'
  | 'verified'
  | 'wall_default';

export enum EFriendStatus {
  NotFriend = 0,
  RequestSent = 1,
  IsSubscribed = 2,
  IsFriend = 3,
}

export enum EPlatform {
  Mobile = 1,
  IPhone = 2,
  IPad = 3,
  Android = 4,
  WindowsPhone = 5,
  Windows10 = 6,
  Desktop = 7,
}

export enum EPolitical {
  Communist = 1,
  Socialist = 2,
  Moderate = 3,
  Liberal = 4,
  Conservative = 5,
  Monarchical = 6,
  Ultraconservative = 7,
  Indifferent = 8,
  Libertarian = 9
}

export enum EPeopleMain {
  SmartAndCreative = 1,
  KindnessAndHonesty = 2,
  BeautyAndHealth = 3,
  PowerAndWealth = 4,
  CourageAndPerseverance = 5,
  HumorAndLoveForLife = 6
}

export enum ELifeMain {
  FamilyAndChildren = 1,
  CareerAndMoney = 2,
  EntertainmentAndRecreation = 3,
  ScienceAndResearch = 4,
  ImprovingTheWorld = 5,
  SelfDevelopment = 6,
  BeautyAndArt = 7,
  FameAndInfluence = 8,
}

export enum ESmoking {
  SharplyNegative = 1,
  Negative = 2,
  Compromise = 3,
  Neutral = 4,
  Positive = 5,
}

export enum EAlcohol {
  SharplyNegative = 1,
  Negative = 2,
  Compromise = 3,
  Neutral = 4,
  Positive = 5,
}

export enum ERelationsStatus {
  Unknown = 0,
  NotMarried = 1,
  HasFriend = 2,
  Betrothed = 3,
  Married = 4,
  Complicated = 5,
  ActiveSearch = 6,
  InLove = 7,
  CivilMarried = 8,
}

export enum ESchoolType {
  School = 0,
  Gymnasium = 1,
  Lyceum = 2,
  BoardingSchool = 3,
  EveningSchool = 4,
  MusicSchool = 5,
  SportsSchool = 6,
  ArtSchool = 7,
  College = 8,
  ProfessionalLyceum = 9,
  TechnicalSchool = 10,
  PTU = 11,
  Institute = 12,
  ArtisticSchool = 12
}

export enum ESex {
  Unknown = 0,
  Female = 1,
  Male = 2,
}

export type TCareer = ({ group_id: number } | { company: string })
  & {
  country_id: number;
  from: number;
  until: number;
  position: string;
} & ({ city_id: number } | { city_name: string })

type TOnline =
  { online: TPseudoBoolean }
  & ({} | { online_mobile: 1; online_app: number })

type TSocial =
  | 'skype'
  | 'facebook'
  | 'twitter'
  | 'livejournal'
  | 'instagram';

/**
 * @see https://vk.com/dev/objects/user
 */
export type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
} & ({ deactivated: 'deleted' | 'banned' } | {
  about?: string;
  activities?: string;
  bdate?: string;
  blacklisted?: TPseudoBoolean;
  blacklisted_by_me?: TPseudoBoolean;
  books?: string;
  can_post?: TPseudoBoolean;
  can_see_all_posts?: TPseudoBoolean;
  can_see_audio?: TPseudoBoolean;
  can_send_friend_request?: TPseudoBoolean;
  can_write_private_message?: TPseudoBoolean;
  career?: TCareer;
  city?: IIdTitlePair;
  common_count?: number;
  connections?: {
    [key in TSocial]?: string;
  };
  contacts?: {
    mobile_phone?: string;
    home_phone?: string;
  };
  counters?: {
    albums: number;
    videos: number;
    audios: number;
    photos: number;
    notes: number;
    friends: number;
    groups: number;
    online_friends: number;
    mutual_friends: number;
    user_videos: number;
    followers: number;
    pages: number;
  };
  country?: IIdTitlePair;
  crop_photo?: ICropPhoto;
  domain?: string;
  education?: {
    university: number;
    university_name: string;
    faculty: number;
    faculty_name: string;
    graduation: number;
  };
  first_name_nom?: string;
  first_name_gen?: string;
  first_name_dat?: string;
  first_name_acc?: string;
  first_name_ins?: string;
  first_name_abl?: string;
  followers_count?: number;
  friend_status?: EFriendStatus;
  games?: string;
  has_mobile?: TPseudoBoolean;
  has_photo?: TPseudoBoolean;
  home_town?: string;
  interests?: string;
  is_favorite?: TPseudoBoolean;
  is_friend?: TPseudoBoolean;
  is_hidden_from_feed?: TPseudoBoolean;
  last_name_nom?: string;
  last_name_gen?: string;
  last_name_dat?: string;
  last_name_acc?: string;
  last_name_ins?: string;
  last_name_abl?: string;
  last_seen?: {
    time: number;
    platform: EPlatform;
  };
  lists?: string;
  maiden_name?: string;
  military?: {
    unit: string;
    unit_id: number;
    country_id: number;
    from: number;
    until: number;
  };
  movies?: string;
  music?: string;
  nickname?: string;
  occupation?: {
    type: 'work' | 'school' | 'university';
    id: number;
    name: string;
  };
} & TOnline & {
  personal?: {
    political?: EPolitical;
    // TODO: API doc is piece of shit
    langs?: (string | number)[];
    religion?: string;
    inspired_by?: string;
    people_main?: EPeopleMain;
    life_main?: ELifeMain;
    smoking?: ESmoking;
    alcohol?: EAlcohol;
  };
  photo_50?: string;
  photo_100?: string;
  photo_200_orig?: string;
  photo_200?: string;
  photo_400_orig?: string;
  photo_id?: string;
  photo_max?: string;
  photo_max_orig?: string;
  quotes?: string;
  relatives?: Array<{
    id: number;
    name: string;
    type:
      | 'child'
      | 'sibling'
      | 'parent'
      | 'grandparent'
      | 'grandchild';
  }>;
  relation?: ERelationsStatus;
  relation_partner?: {
    id?: number;
    name?: string;
  };
  schools?: Array<{
    id: number;
    country: number;
    city: number;
    name: string;
    year_from: number;
    year_to: number;
    year_graduated: number;
    class: string;
    speciality: string;
    type: ESchoolType;
    type_str: string;
  }>;
  screen_name?: string;
  sex?: ESex;
  site?: string;
  status?: number;
  status_audio?: IAudio;
  timezone?: number;
  trending?: TPseudoBoolean;
  tv?: string;
  universities?: Array<{
    id: number;
    country: number;
    city: number;
    name: string;
    faculty: number;
    faculty_name: string;
    chair: number;
    chair_name: string;
    graduation: number;
    education_form: string;
    education_status: string;
  }>;
  verified?: TPseudoBoolean;
  wall_default?: 'owner' | 'all';
});
