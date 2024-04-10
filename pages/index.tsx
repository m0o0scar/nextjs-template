'use client';

import { useEffect, useRef, useState } from 'react';

import { useTextClassification } from './workers/textClassification/useTextClassification';

export default function Home() {
  const [text, setText] = useState('');
  const { ready, result } = useTextClassification(text);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Enter text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>ready ? {String(ready)}</div>

      {result && <div>{JSON.stringify(result, null, 2)}</div>}
    </div>
  );
}
