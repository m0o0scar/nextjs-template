import Anthropic from '@anthropic-ai/sdk';

export const getAnthropicClient = () => {
  const { protocol, host } = window.location;
  return new Anthropic({
    apiKey: ' ',
    baseURL: `${protocol}//${host}/api/proxy/anthropic`,
  });
};
