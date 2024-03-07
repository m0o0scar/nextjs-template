import { OpenAI } from 'openai';

export const getOpenAIClient = () => {
  const { protocol, host } = window.location;
  return new OpenAI({
    apiKey: '',
    baseURL: `${protocol}//${host}/api/proxy/openai`,
    dangerouslyAllowBrowser: true,
  });
};
