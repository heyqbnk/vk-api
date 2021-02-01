import {IRepositories} from '../types';
import {
  DatabaseRepository,
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
} from '../repositories';
import {TSendRequest} from '../types';

const notImplemented: TSendRequest = () => {
  throw new Error(
    'Unable to call repository method due to Core was not initialized',
  );
};

export abstract class Core implements IRepositories {
  database = new DatabaseRepository(notImplemented);
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
    this.database = new DatabaseRepository(addRequestToQueue);
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
