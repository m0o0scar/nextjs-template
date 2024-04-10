'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const worker = useRef<Worker | null>(null);

  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);

  const classify = (text: string) => worker.current?.postMessage({ text });

  const onMessageReceived = (e: any) => {
    switch (e.data.status) {
      case 'initiate':
        setReady(false);
        break;
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
      console.log('creating worker ...');
      worker.current = new Worker(new URL('./workers/worker.ts', import.meta.url), {
        type: 'module',
      });
    }

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => worker.current!.removeEventListener('message', onMessageReceived);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Enter text here"
          onChange={(e) => classify(e.target.value)}
        />
      </div>

      <div>ready ? {String(ready)}</div>

      {result && <div>{JSON.stringify(result, null, 2)}</div>}
    </div>
  );
}
