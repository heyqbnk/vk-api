import {
  PERFORM_REQUEST_EVENT,
  REQUEST_PERFORM_ALLOWED_EVENT,
} from './constants';

export interface IVKAPIMessage {
  tunnelName: string;
  requestId: string;
  isVKAPIMessage: true;
}

/**
 * Message which sent, when consumer wants to perform request.
 */
export interface IVKAPIPerformRequestMessage extends IVKAPIMessage {
  type: typeof PERFORM_REQUEST_EVENT;
}

/**
 * Message which sent, when worker is allowed to perform request.
 */
export interface IVKAPIRequestPerformAllowedMessage extends IVKAPIMessage {
  type: typeof REQUEST_PERFORM_ALLOWED_EVENT;
}
