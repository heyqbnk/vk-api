import {
  AuthRepository,
  DatabaseRepository,
  DonutRepository,
  GiftsRepository,
  LikesRepository,
  StorageRepository,
  SpecialsRepository,
  MessagesRepository,
  NotificationsRepository,
  StatEventsRepository,
  StatsRepository,
  StreamingRepository,
  UsersRepository,
  UtilsRepository,
  WidgetsRepository, DownloadedGamesRepository, AccountRepository,
} from '../repositories';

/**
 * Enum of available languages.
 */
export enum ELang {
  RU = 0,
  UK = 1,
  BE = 2,
  EN = 3,
  ES = 4,
  FI = 5,
  DE = 6,
  IT = 7
}

/**
 * Type which describes available languages.
 * @see https://vk.com/dev/api_requests?f=2.%20Общие%20параметры
 */
export type TLang =
  | 'ru'
  | 'uk'
  | 'be'
  | 'en'
  | 'es'
  | 'fi'
  | 'de'
  | 'it'
  | ELang;

/**
 * Pseudo boolean type. Means boolean converted to number.
 */
export type TPseudoBoolean = 0 | 1;

/**
 * All boolean types which could be accepted by lib.
 */
export type TBoolean = boolean | TPseudoBoolean;

/**
 * Object with fields id and title.
 */
export interface IIdTitlePair {
  /**
   * Unique identifier.
   */
  id: number;
  /**
   * Short name.
   */
  title: string;
}

/**
 * Structure representing some pager
 */
export interface IPager<Item> {
  /**
   * Records count
   */
  count: number;

  /**
   * List of records
   */
  items: Item[];
}

/**
 * Shared optional request parameters.
 */
export interface IRequestOptionalParams {
  /**
   * Access token.
   */
  accessToken?: string;
  /**
   * Language.
   * @default "ru"
   */
  lang?: TLang;
  /**
   * API version.
   * @default "5.110"
   */
  v?: string;
}

/**
 * Config to execute request.
 */
export interface IRequestConfig<P extends {} = any> {
  /**
   * API method name.
   */
  method: string;
  /**
   * List of params for passed method.
   */
  params: P & IRequestOptionalParams;
}

/**
 * Function that sends request.
 */
export type TSendRequest = <P extends {} = any, R = any>(
  config: IRequestConfig<P>,
) => Promise<R>;

/**
 * Describes repository method.
 */
export type TRepositoryMethod<P extends {} = any, R = any> = (
  params: P & IRequestOptionalParams,
) => Promise<R>;

/**
 * List of all known repositories.
 */
export interface IRepositories {
  account: AccountRepository;
  auth: AuthRepository;
  database: DatabaseRepository;
  donut: DonutRepository;
  downloadedGames: DownloadedGamesRepository;
  gifts: GiftsRepository;
  likes: LikesRepository;
  messages: MessagesRepository;
  notifications: NotificationsRepository;
  specials: SpecialsRepository;
  statEvents: StatEventsRepository;
  stats: StatsRepository;
  storage: StorageRepository;
  streaming: StreamingRepository;
  users: UsersRepository;
  utils: UtilsRepository;
  widgets: WidgetsRepository;
}