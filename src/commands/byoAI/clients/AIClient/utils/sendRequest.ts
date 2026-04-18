import chathy from '@chatherine/chathy';
import { httpClient } from './httpClient';
import { asyncIterator } from './asyncIterator';

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

const formatTools = (tools) => {
  if (!tools || tools.length === 0) {
    return undefined;
  }

  return tools.map(tool => ({
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.inputSchema || {},
    },
  }));
};

export const sendRequest = (apiConfig) => async (messages, options?, token?): Promise<chathy.LanguageModelChatResponse> => {
  const requestBody: any = {
    model: apiConfig.model,
    messages: formatMessages(messages),
  };

  // Add tools if provided
  if (options?.tools) {
    const formattedTools = formatTools(options.tools);
    if (formattedTools) {
      requestBody.tools = formattedTools;
      requestBody.tool_choice = 'auto';
    }
  }

  return httpClient
    .post(apiConfig.endpoint + '/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`,
      },
      body: requestBody,
    })
    .then(({ choices }) => choices)
    .then(([choice]) => choice.message.content)
    // Convert the response text into an async iterator to match vscode's LanguageModelChatResponse structure
    .then(text => ({
      stream: asyncIterator(text),
      text: asyncIterator(text),
    }));
};
