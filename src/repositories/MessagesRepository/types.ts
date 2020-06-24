import {Button} from '../../types/objects';

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
export type SendParams = {
    randomId?: number;
    peerId?: number;
    domain?: string;
    chatId?: number;
    lat?: number;
    long?: number;
    replyTo?: number;
    forwardMessages?: number[];
    stickerId?: number;
    groupId?: number;
    keyboard?: { buttons: Button[][] }
      & ({ inline: true } | { inline: false; oneTime: boolean });
    payload?: any;
    dontParseLinks?: boolean;
    disableMentions?: boolean;
    intent?: 'promo_newsletter' | 'bot_ad_invite' | 'bot_ad_promo';
  }
  & ({ userId?: number } | { userIds?: number[] })
  & ({ message: string } | {
  message?: string;
  // TODO: Create separate class
  attachment?: string;
})
