import { env, pipeline, PipelineType } from '@xenova/transformers';

// Skip local model check
env.allowLocalModels = false;

interface Progress {
  status: string;
  task: PipelineType;
  model?: string;
}

interface ProgressCallback {
  (progress: Progress): void;
}

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task: PipelineType = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance: ReturnType<typeof pipeline> | null = null;

  static async getInstance(progress_callback?: ProgressCallback) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

// Retrieve the classification pipeline.
const classifier = await PipelineSingleton.getInstance((x) => {
  // We also add a progress callback to the pipeline so that we can
  // track model loading.
  self.postMessage(x);
});

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  // Perform the classification
  const output = await classifier(event.data.text, event.data.options);

  // Send the output back to the main thread
  self.postMessage({
    status: 'complete',
    output: output,
  });
});

console.log('worker is running');
