import { createOpenAI } from '@components/llm/openai';
import { uniqBy } from 'lodash';
import { ChatCompletionSnapshot } from 'openai/lib/ChatCompletionStream';
import { useEffect, useState } from 'react';

async function getCurrentLocation() {
  return 'Singapore';
}

async function getWeather(args: { location: string }) {
  return {
    temperature: -10,
    description: 'It will snow for the rest of the day',
  };
}

export default function ToolDemo() {
  // we use snapshots here instead of messages (ChatCompletionMessageParam),
  // because when using auto tool calls, the parameters in chunk event is a ChatCompletionSnapshot,
  // using the chunk event and snapshots, we'll be able to stream & render both tool calls and messages correctly.
  const [snapshots, setSnapshots] = useState<ChatCompletionSnapshot[]>([]);

  useEffect(() => {
    (async () => {
      const client = createOpenAI();

      // see here for documentation of "Automated function calls": https://arc.net/l/quote/ukpspfvt
      const runner = client.beta.chat.completions.runTools({
        model: 'gpt-4o',
        stream: true,
        stream_options: {
          // include usage in the stream
          // https://platform.openai.com/docs/api-reference/chat/create#chat-create-stream_options
          include_usage: true,
        },
        messages: [{ role: 'user', content: 'How is the weather like today?' }],
        tools: [
          {
            type: 'function',
            function: {
              function: getCurrentLocation,
              description: 'Get the current location',
              parameters: { type: 'object', properties: {} },
            },
          },
          {
            type: 'function',
            function: {
              function: getWeather,
              description: 'Get the weather of a given location',
              parameters: {
                type: 'object',
                properties: { location: { type: 'string' } },
              },
            },
          },
        ],
      });

      // See "Chat Events" documentation for all supported events:
      // https://github.com/openai/openai-node/blob/master/helpers.md#chat-events
      runner.on('chunk', (chunk, snapshot) => {
        setSnapshots((snapshots) => uniqBy([...snapshots, snapshot], 'id'));
      });

      // wait until completion, you can access usage from the completion object
      const completion = await runner.finalChatCompletion();
      console.log('completion:', completion);
    })();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-2">
      {snapshots.length === 0 && '...'}
      {snapshots.map((snapshot, i) => {
        const { message } = snapshot.choices[0];

        // use message
        if (message.role === 'user') {
          return <div key={i}>😀: {message.content as string}</div>;
        }

        // assistant message
        if (message.role === 'assistant') {
          // assistant text message
          if (message.content) {
            return <div key={i}>🤖: {message.content as string}</div>;
          }

          // assistant tool use
          if (message.tool_calls) {
            return (
              <div key={i}>
                🤖: using tools{' '}
                {message.tool_calls.map((t, index) => {
                  if (!t.function) return null;
                  return (
                    <code key={index} className="bg-black text-white">
                      {t.function.name}({t.function.arguments})
                    </code>
                  );
                })}
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}
