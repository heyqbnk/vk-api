import {ProcessRequest, RequestOptionalParams} from '../../types';

export interface MessagesRepositoryConstructorProps {
  processRequest: ProcessRequest;
}

/* SEND */

// TODO: Refactor. Not sure we can pass both userIds and userId at the same time
interface SendMethodOptions extends RequestOptionalParams {
  userId?: number;
  randomId?: number;
  peerId?: number;
  domain?: string;
  chatId?: number;
  userIds?: number[];
  // TODO: Not required of attachment passed
  message?: string;
  lat?: number;
  long?: number;
  // TODO: Create separate class
  attachment?: string;
  replyTo?: number;
  forwardMessages?: number[];
  stickerId?: number;
  groupId?: number;
  // TODO: Describe
  keyboard?: any;
  payload?: any;
  dontParseLinks?: boolean;
  disableMentions?: boolean;
  // TODO: Move to separate type
  intent?: 'promo_newsletter' | 'bot_ad_invite' | 'bot_ad_promo';
}

export type SendMethodResult = number | Array<{
  peerId: number;
  messageId: number;
  error?: string;
}>

export type SendMethod = (options: SendMethodOptions) => Promise<SendMethodResult>

export interface MessagesRepositoryInterface {
  // https://vk.com/dev/messages.send
  send: SendMethod;
}
