import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const openai = createOpenAI({ baseURL: '/api/proxy/openai', apiKey: '' });
const model = openai('gpt-4o');

// const gemini = createGoogleGenerativeAI({ baseURL: '/api/proxy/gemini', apiKey: '' });
// const model = gemini('models/gemini-1.5-flash-latest');

export default function LLMTestPage() {
  const { status } = useSession();

  const [reply, setReply] = useState('');

  useEffect(() => {
    (async () => {
      if (status === 'authenticated') {
        const result = await generateText({
          model,
          prompt: 'Hi, how are you?',
        });

        setReply(result.text);
      }
    })();
  }, [status]);

  return (
    <div className="p-4">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'unauthenticated' && <p>Please login.</p>}
      {status === 'authenticated' && (
        <p>
          {reply && (
            <>
              <b>{model.modelId}</b>: {reply}
            </>
          )}
          {!reply && 'Thinking ...'}
        </p>
      )}
    </div>
  );
}
