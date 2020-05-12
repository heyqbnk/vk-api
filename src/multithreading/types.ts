import {ProcessRequestConfig} from '../types';

export interface VKAPIMessage {
  processId: number;
  requestId: string;
  isVKAPIMessage: true;
}

/**
 * Message which sent, when slave wants to process request
 */
export interface VKAPIProcessRequestMessage extends VKAPIMessage {
  type: MessageTypeEnum.ProcessRequest;
  config: ProcessRequestConfig;
}

/**
 * Message which is sent, when request is processed
 */
export interface VKAPIRequestProcessedMessage extends VKAPIMessage {
  type: MessageTypeEnum.RequestProcessed;
  error: Error | null;
  data: any;
}

export enum MessageTypeEnum {
  ProcessRequest = 'process-request',
  RequestProcessed = 'request-processed',
}
