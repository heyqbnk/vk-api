/**
 * @see https://vk.com/dev/statEvents.addMiniAppsCustom
 */
export interface AddMiniAppsCustomParams {
  events: Array<{
    event: string;
    userId: number;
  }>;
}

export type AddMiniAppsCustomResult = 1;

/**
 * @see https://vk.com/dev/statEvents.addMiniApps
 */
export interface AddMiniAppsParams extends AddMiniAppsCustomParams {
}

export type AddMiniAppsResult = AddMiniAppsCustomResult;
