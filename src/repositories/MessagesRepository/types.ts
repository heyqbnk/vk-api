/**
 * @see https://vk.com/dev/messages.send
 */
// TODO: Refactor depending on params
export type SendResult = number | Array<{
  peerId: number;
  messageId: number;
  error?: string;
}>

// TODO: Refactor. Not sure we can pass both userIds and userId at the same time
export interface SendParams {
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
  keyboard?: {
    buttons: Array<Array<Record<any, any>>>;
  } & ({
    inline: true;
  } | {
    inline: false;
    oneTime: boolean;
  });
  payload?: any;
  dontParseLinks?: boolean;
  disableMentions?: boolean;
  // TODO: Move to separate type
  intent?: 'promo_newsletter' | 'bot_ad_invite' | 'bot_ad_promo';
}
