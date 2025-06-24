import chathy from '@chatherine/chathy';
import { httpClient } from './utils/httpClient';
import { asyncIterator } from './utils/asyncIterator';

export interface ApiConfig {
  endpoint: string;
  apiKey: string;
  model: string;
};

const formatMessages = (messages) =>
  messages
    ?.flatMap(message => message?.c)
    ?.map(content => ({
      role: 'user',
      content: content?.value,
    }));

export const sendRequest = (apiConfig) => async (messages): Promise<chathy.LanguageModelChatResponse> =>
  httpClient
    .post(apiConfig.endpoint + '/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`,
      },
      body: {
        model: apiConfig.model,
        messages: formatMessages(messages),
      },
    })
    .then(({ choices }) => choices)
    .then(([choice]) => choice.message.content)
    .then(text => ({
      stream: asyncIterator(text),
      text: asyncIterator(text),
    }));