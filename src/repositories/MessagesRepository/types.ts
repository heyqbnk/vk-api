import {IButton} from '../../types';

/**
 * @see https://vk.com/dev/messages.send
 */
// TODO: Refactor depending on params
export type TSendResult = number | Array<{
  peer_id: number;
  message_id: number;
  error?: string;
}>

// TODO: Refactor. Not sure we can pass both user_ids and user_id at the same
//  time
export type TSendParams = {
    random_id?: number;
    peer_id?: number;
    domain?: string;
    chat_id?: number;
    lat?: number;
    long?: number;
    reply_to?: number;
    forward_messages?: number[];
    sticker_id?: number;
    group_id?: number;
    keyboard?: { buttons: IButton[][] }
      & ({ inline: true } | { inline: false; oneTime: boolean });
    payload?: any;
    dont_parse_links?: boolean;
    disable_mentions?: boolean;
    intent?: 'promo_newsletter' | 'bot_ad_invite' | 'bot_ad_promo';
  }
  & ({ user_id?: number } | { user_ids?: number[] })
  & ({ message: string } | {
  message?: string;
  // TODO: Create separate class
  attachment?: string;
})
