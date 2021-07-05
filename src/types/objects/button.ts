interface ITextButtonAction {
  type: 'text';
  label: string;
  payload: string;
}

interface IOpenLinkButtonAction {
  type: 'open_link';
  link: string;
  label: string;
  payload: string;
}

interface ILocationButtonAction {
  type: 'location';
  payload: string;
}

interface IVKPayButtonAction {
  type: 'vkpay';
  payload: string;
  hash: string;
}

interface IVKAppsButtonAction {
  type: 'open_app';
  app_id: number;
  owner_id?: number;
  payload: string;
  label: string;
  hash?: string;
}

/**
 * @see https://vk.com/dev/bots_docs_3
 */
export interface IButton {
  color?: string;
  action:
    | ITextButtonAction
    | IOpenLinkButtonAction
    | ILocationButtonAction
    | IVKPayButtonAction
    | IVKAppsButtonAction;
}
