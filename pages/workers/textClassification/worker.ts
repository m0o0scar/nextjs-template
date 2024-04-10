import { env, pipeline, PipelineType } from '@xenova/transformers';

import { TextClassificationRequestMessage, TextClassificationResultMessage } from './type';

// Skip local model check
env.allowLocalModels = false;

// Create the classifier pipeline
const task: PipelineType = 'text-classification';
const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
const classifier = await pipeline(task, model, { progress_callback: self.postMessage });

// Listen for messages from the main thread
self.addEventListener('message', async (event: MessageEvent<TextClassificationRequestMessage>) => {
  // Perform the classification
  const output = await classifier(event.data.text, undefined);

  // Send the output back to the main thread
  self.postMessage({
    status: 'complete',
    output: output,
  } as TextClassificationResultMessage);
});
