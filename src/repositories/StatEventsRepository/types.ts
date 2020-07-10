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
