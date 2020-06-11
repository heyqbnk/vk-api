import {PseudoBooleanType} from './shared';

// User entity: https://vk.com/dev/objects/user
export type NameCaseType = 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'abl';
export type UserDeactivatedType = 'deleted' | 'banned';
export type OccupationTypeType = 'work' | 'school' | 'university';
export type RelativeTypeType =
  | 'child'
  | 'sibling'
  | 'parent'
  | 'grandparent'
  | 'grandchild';
export type WallDefaultType = 'owner' | 'all';
export type UserFieldType =
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
  | 'wall_default'

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

export type UserCareer =
  ({ groupId: number; company: number } |
    { groupId: string; company: string })
  & {
  countryId: number;
  from: number;
  until: number;
  position: string;
}
  & ({ cityId: number; cityName: number }
  | { cityId: string; cityName: string })

export interface UserContacts {
  mobilePhone?: string;
  homePhone: string;
}

export interface UserCounters {
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
}

interface Crop {
  x: number;
  y: number;
  x2: number;
  y2: number;
}

export interface UserCropPhoto {
  // TODO: to do
  photo: any;
  crop: Crop;
  rect: Crop;
}

export interface UserEducation {
  university: number;
  universityName: string;
  faculty: number;
  facultyName: string;
  graduation: number;
}

export interface UserLastSeen {
  time: number;
  platform: PlatformEnum;
}

export interface UserMilitary {
  unit: string;
  unitId: number;
  countryId: number;
  from: number;
  until: number;
}

export interface UserOccupation {
  type: OccupationTypeType;
  id: number;
  name: string;
}

type Online =
  { online: PseudoBooleanType }
  & ({ onlineMobile?: 1 } | { onlineMobile: 1; onlineApp: number })

interface Personal {
  political: number;
  langs: string[];
  religion: string;
  inspiredBy: string;
  peopleMain: PeopleMainEnum;
  lifeMain: LifeMainEnum;
  smoking: SmokingEnum;
  alcohol: AlcoholEnum;
}

interface UserRelative {
  id: number;
  name: string;
  type: RelativeTypeType;
}

type Schools = Array<{
  id: number;
  country: number;
  city: number;
  name: string;
  yearFrom: number;
  yearTo: number;
  yearGraduated: number;
  class: string;
  speciality: string;
  type: number;
  typeStr: string;
}>;

interface UserUniversity {
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
}

export interface UserBaseProps {
  id: number;
  firstName: string;
  lastName: string;
  isClosed: boolean;
  canAccessClosed: boolean;
}

// NOTE: Should we use this type? The reason why we should not is there is no 
//  guarantee these fields will be in response and we have to check their
//  existence every time. So, it is more correct to use object with optional
//  fields. Moreover, it is rather hard to work with this type due to 
//  TypeScript throws error meaning, it cannot calculate the final type if
//  used with some generics or something like that (too many combinations)
// export type User<F extends UserFieldType> =
//   (UserBaseProps & { deactivated: UserDeactivatedType })
//   | (
//   UserBaseProps
//   & (F extends 'about' ? { about: string } : {})
//   & (F extends 'activities' ? { activities: string } : {})
//   & (F extends 'bdate' ? { bdate?: string } : {})
//   & (F extends 'blacklisted' ? { blacklisted: PseudoBooleanType } : {})
//   & (F extends 'blacklisted_by_me'
//   ? { blacklistedByMe: PseudoBooleanType } : {})
//   & (F extends 'books' ? { books: string } : {})
//   & (F extends 'can_post' ? { canPost: PseudoBooleanType } : {})
//   & (F extends 'can_see_all_posts'
//   ? { canSeeAllPosts: PseudoBooleanType } : {})
//   & (F extends 'can_see_audio' ? { canSeeAudio: PseudoBooleanType } : {})
//   & (F extends 'can_send_friend_request'
//   ? { canSendFriendRequest: PseudoBooleanType } : {})
//   & (F extends 'can_write_private_message'
//   ? { canWritePrivateMessage: PseudoBooleanType } : {})
//   & (F extends 'career' ? { career: Career } : {})
//   & (F extends 'city' ? { city: IdTitlePair } : {})
//   & (F extends 'common_count' ? { commonCount: number } : {})
//   & (F extends 'connections' ? { connections: Record<string, string> } : {})
//   & (F extends 'contacts' ? { contacts: Contacts } : {})
//   & (F extends 'counters' ? { counters: Counters } : {})
//   & (F extends 'country' ? { country: IdTitlePair } : {})
//   & (F extends 'crop_photo' ? { cropPhoto: CropPhoto } : {})
//   & (F extends 'domain' ? { domain: string } : {})
//   & (F extends 'education' ? { education: Education } : {})
//   & (F extends 'first_name_nom' ? { firstNameNom: string } : {})
//   & (F extends 'first_name_gen' ? { firstNameGen: string } : {})
//   & (F extends 'first_name_dat' ? { firstNameDat: string } : {})
//   & (F extends 'first_name_acc' ? { firstNameAcc: string } : {})
//   & (F extends 'first_name_ins' ? { firstNameIns: string } : {})
//   & (F extends 'first_name_abl' ? { firstNameAbl: string } : {})
//   & (F extends 'followers_count' ? { followersCount: number } : {})
//   & (F extends 'friend_status' ? { friendStatus: 0 | 1 | 2 | 3 } : {})
//   & (F extends 'games' ? { games: string } : {})
//   & (F extends 'has_mobile' ? { hasMobile: PseudoBooleanType } : {})
//   & (F extends 'has_photo' ? { hasPhoto: PseudoBooleanType } : {})
//   & (F extends 'home_town' ? { homeTown: string } : {})
//   & (F extends 'interests' ? { interests: string } : {})
//   & (F extends 'is_favorite' ? { isFavorite: PseudoBooleanType } : {})
//   & (F extends 'is_friend' ? { isFriend: PseudoBooleanType } : {})
//   & (F extends 'is_hidden_from_feed'
//   ? { isHiddenFromFeed: PseudoBooleanType } : {})
//   & (F extends 'last_name_nom' ? { lastNameNom: string } : {})
//   & (F extends 'last_name_gen' ? { lastNameGen: string } : {})
//   & (F extends 'last_name_dat' ? { lastNameDat: string } : {})
//   & (F extends 'last_name_acc' ? { lastNameAcc: string } : {})
//   & (F extends 'last_name_ins' ? { lastNameIns: string } : {})
//   & (F extends 'last_name_abl' ? { lastNameAbl: string } : {})
//   & (F extends 'last_seen' ? { lastSeen: UserLastSeen } : {})
//   & (F extends 'lists' ? { lists: string } : {})
//   & (F extends 'maiden_name' ? { maidenName: string } : {})
//   & (F extends 'military' ? { military: UserMilitary } : {})
//   & (F extends 'movies' ? { movies: string } : {})
//   & (F extends 'music' ? { music: string } : {})
//   & (F extends 'nickname' ? { nickname: string } : {})
//   & (F extends 'occupation' ? { occupation: UserOccupation } : {})
//   & (F extends 'online' ? Online : {})
//   & (F extends 'personal' ? { personal: Personal } : {})
//   & (F extends 'photo_50' ? { photo50: string } : {})
//   & (F extends 'photo_100' ? { photo100: string } : {})
//   & (F extends 'photo_200_orig' ? { photo200orig: string } : {})
//   & (F extends 'photo_200' ? { photo200: string } : {})
//   & (F extends 'photo_400_orig' ? { photo400orig: string } : {})
//   & (F extends 'photo_id' ? { photoId?: string } : {})
//   & (F extends 'photo_max' ? { photoMax: string } : {})
//   & (F extends 'photo_max_orig' ? { photoMaxOrig: string } : {})
//   & (F extends 'quotes' ? { quotes: string } : {})
//   & (F extends 'relatives' ? { relatives: Relatives } : {})
//   & (F extends 'relation' ? Relation : {})
//   & (F extends 'schools' ? { schools: Schools } : {})
//   & (F extends 'screen_name' ? { screenName: string } : {})
//   & (F extends 'sex' ? { sex: 1 | 2 | 0 } : {})
//   & (F extends 'site' ? { site: string } : {})
//   & (F extends 'status' ? Status : {})
//   & (F extends 'timezone' ? { timezone: number } : {})
//   & (F extends 'trending' ? { trending: PseudoBooleanType } : {})
//   & (F extends 'tv' ? { tv: string } : {})
//   & (F extends 'universities' ? { universities: Universities } : {})
//   & (F extends 'verified' ? { verified: PseudoBooleanType } : {})
//   & (F extends 'wall_default' ? { wallDefault: 'owner' | 'all' } : {})
//   );

export type User =
  (UserBaseProps & { deactivated: UserDeactivatedType })
  | (
  UserBaseProps
  & {
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
  career?: UserCareer;
  city?: IdTitlePair;
  commonCount?: number;
  connections?: Record<string, string>;
  contacts?: UserContacts;
  counters?: UserCounters;
  country?: IdTitlePair;
  cropPhoto?: UserCropPhoto;
  domain?: string;
  education?: UserEducation;
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
  lastSeen?: UserLastSeen;
  lists?: string;
  maidenName?: string;
  military?: UserMilitary;
  movies?: string;
  music?: string;
  nickname?: string;
  occupation?: UserOccupation;
  online?: PseudoBooleanType;
  onlineMobile?: 1;
  onlineApp?: number;
  personal?: Personal;
  photo50?: string;
  photo100?: string;
  photo200orig?: string;
  photo200?: string;
  photo400orig?: string;
  photoId?: string;
  photoMax?: string;
  photoMaxOrig?: string;
  quotes?: string;
  relatives?: UserRelative[];
  relation?: RelationEnum;
  relationPartner?: {
    id?: number;
    name?: string;
  };
  schools?: Schools;
  screenName?: string;
  sex?: SexEnum;
  site?: string;
  status?: number;
  // TODO?: todo
  statusAudio?: any;
  timezone?: number;
  trending?: PseudoBooleanType;
  tv?: string;
  universities?: UserUniversity[];
  verified?: PseudoBooleanType;
  wallDefault?: WallDefaultType;
});
