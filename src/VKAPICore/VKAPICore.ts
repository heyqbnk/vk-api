import {VKAPIRepositories} from '../VKAPI';
import {MessagesRepository} from '../repositories/MessagesRepository';
import {NotificationsRepository} from '../repositories/NotificationsRepository';
import {StatEventsRepository} from '../repositories/StatEventsRepository';
import {StatsRepository} from '../repositories/StatsRepository';
import {StreamingRepository} from '../repositories/StreamingRepository';
import {UsersRepository} from '../repositories/UsersRepository';
import {UtilsRepository} from '../repositories/UtilsRepository';
import {WidgetsRepository} from '../repositories/WidgetsRepository';
import {DatabaseRepository} from '../repositories/DatabaseRepository';
import {SendRequest} from '../types';
import {SpecialsRepository} from '../repositories/SpecialsRepository';
import {StorageRepository} from '../repositories/StorageRepository';

const notImplemented: SendRequest = () => {
  throw new Error(
    'Unable to call repository method due to VKAPICore was not initialized',
  );
};

export abstract class VKAPICore implements VKAPIRepositories {
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

  protected init(addRequestToQueue: SendRequest) {
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