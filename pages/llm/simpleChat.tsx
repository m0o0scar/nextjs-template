import { createOpenAI } from '@components/llm/openai';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const prompt = `Today is ${dayjs().format('YYYY/MM/DD')}, please tell me a joke that is somehow related to today's date with an explanation.`;

export default function SimpleChatDemo() {
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const client = createOpenAI();

      const stream = await client.chat.completions.create({
        model: 'gpt-4o',
        stream: true,
        messages: [{ role: 'user', content: prompt }],
      });

      for await (const chunk of stream) {
        setText((text) => text + (chunk.choices[0].delta.content || ''));
      }
    })();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-2">
      <div>😀: {prompt}</div>
      <div>🤖: {text || '...'}</div>
    </div>
  );
}
