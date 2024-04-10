import { TextClassificationOutput } from '@xenova/transformers';

export interface TextClassificationRequestMessage {
  text: string;
}

export type TextClassificationReplyMessage =
  | TextClassificationPipelineReadyMessage
  | TextClassificationResultMessage;

export interface TextClassificationPipelineReadyMessage {
  status: 'ready';
}

export interface TextClassificationResultMessage {
  status: 'complete';
  output: TextClassificationOutput;
}
