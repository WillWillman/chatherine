import chathy from '@chatherine/chathy';

export interface RegisteredModel {
  endpoint: string;
  apiKey: string;
  model: string;
};

const asyncIterator = (data) => ({
  [Symbol.asyncIterator]: async function* () {
    yield data.response;
  },
});

export const sendRequest = (registeredModel: RegisteredModel) => async (prompt): Promise<chathy.LanguageModelChatResponse> => {
  const response = await fetch(registeredModel.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${registeredModel.apiKey}`,
    },
    body: JSON.stringify({ model: registeredModel.model, prompt }),
  });

  const data = await response.json();

  const result: chathy.LanguageModelChatResponse = {
    stream: asyncIterator(data),
    text: asyncIterator(data),
  };

  return result;
};
