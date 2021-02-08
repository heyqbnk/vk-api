import {IRepositories} from '../types';
import {
  AuthRepository,
  DatabaseRepository,
  DonutRepository,
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
  WidgetsRepository,
  GiftsRepository,
  DownloadedGamesRepository,
  AccountRepository,
} from '../repositories';
import {TSendRequest} from '../types';

const notImplemented: TSendRequest = () => {
  throw new Error(
    'Unable to call repository method due to Core was not initialized',
  );
};

export abstract class Core implements IRepositories {
  account = new AccountRepository(notImplemented);
  auth = new AuthRepository(notImplemented);
  database = new DatabaseRepository(notImplemented);
  donut = new DonutRepository(notImplemented);
  downloadedGames = new DownloadedGamesRepository(notImplemented);
  gifts = new GiftsRepository(notImplemented);
  likes = new LikesRepository(notImplemented);
  messages = new MessagesRepository(notImplemented);
  notifications = new NotificationsRepository(notImplemented);
  specials = new SpecialsRepository(notImplemented);
  statEvents = new StatEventsRepository(notImplemented);
  stats = new StatsRepository(notImplemented);
  storage = new StorageRepository(notImplemented);
  streaming = new StreamingRepository(notImplemented);
  users = new UsersRepository(notImplemented);
  utils = new UtilsRepository(notImplemented);
  widgets = new WidgetsRepository(notImplemented);

  protected init(addRequestToQueue: TSendRequest) {
    this.account = new AccountRepository(addRequestToQueue);
    this.auth = new AuthRepository(addRequestToQueue);
    this.database = new DatabaseRepository(addRequestToQueue);
    this.donut = new DonutRepository(addRequestToQueue);
    this.downloadedGames = new DownloadedGamesRepository(addRequestToQueue);
    this.gifts = new GiftsRepository(addRequestToQueue);
    this.likes = new LikesRepository(addRequestToQueue);
    this.messages = new MessagesRepository(addRequestToQueue);
    this.notifications = new NotificationsRepository(addRequestToQueue);
    this.specials = new SpecialsRepository(addRequestToQueue);
    this.statEvents = new StatEventsRepository(addRequestToQueue);
    this.stats = new StatsRepository(addRequestToQueue);
    this.storage = new StorageRepository(addRequestToQueue);
    this.streaming = new StreamingRepository(addRequestToQueue);
    this.users = new UsersRepository(addRequestToQueue);
    this.utils = new UtilsRepository(addRequestToQueue);
    this.widgets = new WidgetsRepository(addRequestToQueue);
  }
}
