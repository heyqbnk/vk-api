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

export type TCareer = ({ groupId: number } | { company: string })
  & {
  countryId: number;
  from: number;
  until: number;
  position: string;
} & ({ cityId: number } | { cityName: string })

type TOnline =
  { online: TPseudoBoolean }
  & ({} | { onlineMobile: 1; onlineApp: number })

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
  firstName: string;
  lastName: string;
  isClosed: boolean;
  canAccessClosed: boolean;
} & ({ deactivated: 'deleted' | 'banned' } | {
  about?: string;
  activities?: string;
  bdate?: string;
  blacklisted?: TPseudoBoolean;
  blacklistedByMe?: TPseudoBoolean;
  books?: string;
  canPost?: TPseudoBoolean;
  canSeeAllPosts?: TPseudoBoolean;
  canSeeAudio?: TPseudoBoolean;
  canSendFriendRequest?: TPseudoBoolean;
  canWritePrivateMessage?: TPseudoBoolean;
  career?: TCareer;
  city?: IIdTitlePair;
  commonCount?: number;
  connections?: {
    [key in TSocial]?: string;
  };
  contacts?: {
    mobilePhone?: string;
    homePhone?: string;
  };
  counters?: {
    albums: number;
    videos: number;
    audios: number;
    photos: number;
    notes: number;
    friends: number;
    groups: number;
    onlineFriends: number;
    mutualFriends: number;
    userVideos: number;
    followers: number;
    pages: number;
  };
  country?: IIdTitlePair;
  cropPhoto?: ICropPhoto;
  domain?: string;
  education?: {
    university: number;
    universityName: string;
    faculty: number;
    facultyName: string;
    graduation: number;
  };
  firstNameNom?: string;
  firstNameGen?: string;
  firstNameDat?: string;
  firstNameAcc?: string;
  firstNameIns?: string;
  firstNameAbl?: string;
  followersCount?: number;
  friendStatus?: EFriendStatus;
  games?: string;
  hasMobile?: TPseudoBoolean;
  hasPhoto?: TPseudoBoolean;
  homeTown?: string;
  interests?: string;
  isFavorite?: TPseudoBoolean;
  isFriend?: TPseudoBoolean;
  isHiddenFromFeed?: TPseudoBoolean;
  lastNameNom?: string;
  lastNameGen?: string;
  lastNameDat?: string;
  lastNameAcc?: string;
  lastNameIns?: string;
  lastNameAbl?: string;
  lastSeen?: {
    time: number;
    platform: EPlatform;
  };
  lists?: string;
  maidenName?: string;
  military?: {
    unit: string;
    unitId: number;
    countryId: number;
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
    inspiredBy?: string;
    peopleMain?: EPeopleMain;
    lifeMain?: ELifeMain;
    smoking?: ESmoking;
    alcohol?: EAlcohol;
  };
  photo50?: string;
  photo100?: string;
  photo200orig?: string;
  photo200?: string;
  photo400orig?: string;
  photoId?: string;
  photoMax?: string;
  photoMaxOrig?: string;
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
  relationPartner?: {
    id?: number;
    name?: string;
  };
  schools?: Array<{
    id: number;
    country: number;
    city: number;
    name: string;
    yearFrom: number;
    yearTo: number;
    yearGraduated: number;
    class: string;
    speciality: string;
    type: ESchoolType;
    typeStr: string;
  }>;
  screenName?: string;
  sex?: ESex;
  site?: string;
  status?: number;
  statusAudio?: IAudio;
  timezone?: number;
  trending?: TPseudoBoolean;
  tv?: string;
  universities?: Array<{
    id: number;
    country: number;
    city: number;
    name: string;
    faculty: number;
    facultyName: string;
    chair: number;
    chairName: string;
    graduation: number;
    educationForm: string;
    educationStatus: string;
  }>;
  verified?: TPseudoBoolean;
  wallDefault?: 'owner' | 'all';
});
