import OpenAI from 'openai';

export const createOpenAI = () => {
  return new OpenAI({
    baseURL: `${location.origin}/api/proxy/openai`,
    dangerouslyAllowBrowser: true,
    apiKey: '',
  });
};
