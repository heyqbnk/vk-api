import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  TAddMiniAppsCustomParams,
  TAddMiniAppsCustomResult,
  IAddMiniAppsParams,
} from './types';

export class StatEventsRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('statEvents', sendRequest);
  }

  /**
   * @see https://vk.com/dev/statEvents.addMiniAppsCustom
   */
  addMiniAppsCustom = this.r<TAddMiniAppsCustomParams,
    TAddMiniAppsCustomResult>('addMiniAppsCustom', params => {
    const {events, ...rest} = params;
    const formattedEvents = events.map(e => {
      const {json, timestamp, ...rest} = e;

      return {
        ...rest,
        json: typeof json === 'object' ? JSON.stringify(json) : undefined,
        timestamp: typeof timestamp === 'number'
          ? timestamp
          : (
            typeof timestamp === 'undefined'
              ? undefined
              : timestamp.getTime()
          ),
      };
    });

    return {...rest, events: formattedEvents};
  });

  /**
   * @see https://vk.com/dev/statEvents.addMiniApps
   */
  addMiniApps = this.r<IAddMiniAppsParams,
    TAddMiniAppsCustomResult>('addMiniApps');
}
