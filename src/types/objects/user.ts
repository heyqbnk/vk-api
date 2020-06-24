import {PseudoBooleanType} from '../shared';
import {Photo} from './photo';
import {Audio} from './audio';

interface IdTitlePair {
  id: number;
  title: string;
}

export enum FriendStatusEnum {
  NotFriend = 0,
  RequestSent = 1,
  IsSubscribed = 2,
  IsFriend = 3,
}

export enum PlatformEnum {
  Mobile = 1,
  IPhone = 2,
  IPad = 3,
  Android = 4,
  WindowsPhone = 5,
  Windows10 = 6,
  Desktop = 7,
}

export enum PoliticalEnum {
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

export enum PeopleMainEnum {
  SmartAndCreative = 1,
  KindnessAndHonesty = 2,
  BeautyAndHealth = 3,
  PowerAndWealth = 4,
  CourageAndPerseverance = 5,
  HumorAndLoveForLife = 6
}

export enum LifeMainEnum {
  FamilyAndChildren = 1,
  CareerAndMoney = 2,
  EntertainmentAndRecreation = 3,
  ScienceAndResearch = 4,
  ImprovingTheWorld = 5,
  SelfDevelopment = 6,
  BeautyAndArt = 7,
  FameAndInfluence = 8,
}

export enum SmokingEnum {
  SharplyNegative = 1,
  Negative = 2,
  Compromise = 3,
  Neutral = 4,
  Positive = 5,
}

export enum AlcoholEnum {
  SharplyNegative = 1,
  Negative = 2,
  Compromise = 3,
  Neutral = 4,
  Positive = 5,
}

export enum RelationEnum {
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

export enum SchoolTypeEnum {
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

export enum SexEnum {
  Unknown = 0,
  Female = 1,
  Male = 2,
}

export type Career = ({ groupId: number } | { company: string })
  & {
  countryId: number;
  from: number;
  until: number;
  position: string;
} & ({ cityId: number } | { cityName: string })

interface Crop {
  x: number;
  y: number;
  x2: number;
  y2: number;
}

type Online =
  { online: PseudoBooleanType }
  & ({} | { onlineMobile: 1; onlineApp: number })

type SocialType =
  | 'skype'
  | 'facebook'
  | 'twitter'
  | 'livejournal'
  | 'instagram';

/**
 * @see https://vk.com/dev/objects/user
 */
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  isClosed: boolean;
  canAccessClosed: boolean;
} & ({ deactivated: 'deleted' | 'banned' } | {
  about?: string;
  activities?: string;
  bdate?: string;
  blacklisted?: PseudoBooleanType;
  blacklistedByMe?: PseudoBooleanType;
  books?: string;
  canPost?: PseudoBooleanType;
  canSeeAllPosts?: PseudoBooleanType;
  canSeeAudio?: PseudoBooleanType;
  canSendFriendRequest?: PseudoBooleanType;
  canWritePrivateMessage?: PseudoBooleanType;
  career?: Career;
  city?: IdTitlePair;
  commonCount?: number;
  connections?: {
    [key in SocialType]?: string;
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
  country?: IdTitlePair;
  cropPhoto?: {
    photo: Photo;
    crop: Crop;
    rect: Crop;
  };
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
  friendStatus?: FriendStatusEnum;
  games?: string;
  hasMobile?: PseudoBooleanType;
  hasPhoto?: PseudoBooleanType;
  homeTown?: string;
  interests?: string;
  isFavorite?: PseudoBooleanType;
  isFriend?: PseudoBooleanType;
  isHiddenFromFeed?: PseudoBooleanType;
  lastNameNom?: string;
  lastNameGen?: string;
  lastNameDat?: string;
  lastNameAcc?: string;
  lastNameIns?: string;
  lastNameAbl?: string;
  lastSeen?: {
    time: number;
    platform: PlatformEnum;
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
} & Online & {
  personal?: {
    political?: PoliticalEnum;
    // TODO: API doc is piece of shit
    langs?: (string | number)[];
    religion?: string;
    inspiredBy?: string;
    peopleMain?: PeopleMainEnum;
    lifeMain?: LifeMainEnum;
    smoking?: SmokingEnum;
    alcohol?: AlcoholEnum;
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
  relation?: RelationEnum;
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
    type: SchoolTypeEnum;
    typeStr: string;
  }>;
  screenName?: string;
  sex?: SexEnum;
  site?: string;
  status?: number;
  statusAudio?: Audio;
  timezone?: number;
  trending?: PseudoBooleanType;
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
  verified?: PseudoBooleanType;
  wallDefault?: 'owner' | 'all';
});
