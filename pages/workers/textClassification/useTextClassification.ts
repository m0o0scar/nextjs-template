import { useEffect, useRef, useState } from 'react';

import { TextClassificationSingle } from '@xenova/transformers';

import { TextClassificationReplyMessage, TextClassificationRequestMessage } from './type';

export const useTextClassification = (text: string) => {
  const worker = useRef<Worker | null>(null);

  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<TextClassificationSingle | null>(null);

  const onMessage = (e: MessageEvent<TextClassificationReplyMessage>) => {
    switch (e.data.status) {
      case 'ready':
        setReady(true);
        break;

      case 'complete':
        setResult(e.data.output[0]);
        break;
    }
  };

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
      worker.current.addEventListener('message', onMessage);
    }
    return () => worker.current?.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (!text) {
      setResult(null);
    } else if (worker.current) {
      worker.current.postMessage({ text } as TextClassificationRequestMessage);
    }
  }, [text]);

  return {
    ready,
    result,
  };
};
