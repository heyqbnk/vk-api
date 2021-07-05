/**
 * @see https://vk.com/dev/statEvents.addMiniAppsCustom
 */
export type TAddMiniAppsCustomParams = {
  events: Array<{
    event: string;
    user_id: number;
    timezone?: string;
    mini_app_id: number;
    url: string;
    vk_platform: string;
    json?: Record<any, any>;
    timestamp?: Date | number;
  } & (
    { type_navgo: { type: 'type_mini_app_custom_event_item' } }
    | { type_view: { type: 'type_mini_app_custom_event_item' } }
    | { type_click: { type: 'type_mini_app_custom_event_item' } }
    )>;
}

export type TAddMiniAppsCustomResult = 1;

/**
 * @see https://vk.com/dev/statEvents.addMiniApps
 */
export interface IAddMiniAppsParams extends TAddMiniAppsCustomParams {
}

export type TAddMiniAppsResult = TAddMiniAppsCustomResult;
