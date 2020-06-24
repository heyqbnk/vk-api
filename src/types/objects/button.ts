interface TextButtonAction {
  type: 'text';
  label: string;
  payload: string;
}

interface OpenLinkButtonAction {
  type: 'open_link';
  link: string;
  label: string;
  payload: string;
}

interface LocationButtonAction {
  type: 'location';
  payload: string;
}

interface VKPayButtonAction {
  type: 'vkpay';
  payload: string;
  hash: string;
}

interface VKAppsButtonAction {
  type: 'open_app';
  appId: number;
  ownerId: number;
  payload: string;
  label: string;
  hash: string;
}

/**
 * @see https://vk.com/dev/bots_docs_3
 */
export interface Button {
  color: string;
  action:
    | TextButtonAction
    | OpenLinkButtonAction
    | LocationButtonAction
    | VKPayButtonAction
    | VKAppsButtonAction;
}
