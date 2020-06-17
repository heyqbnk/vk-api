import {RequestConfig} from '../types';

export interface VKAPIMessage {
  tunnelName: string;
  processId: number;
  requestId: string;
  isVKAPIMessage: true;
}

/**
 * Message which sent, when slave wants to process request
 */
export interface VKAPIProcessRequestMessage extends VKAPIMessage {
  type: 'process-request';
  config: RequestConfig;
}

/**
 * Message which is sent, when request is processed
 */
export interface VKAPIRequestProcessedMessage extends VKAPIMessage {
  type: 'request-processed';
  error: Error | null;
  data: any;
}
