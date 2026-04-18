import * as vscode from 'vscode';
import { CancellationToken, LanguageModelChat, LanguageModelChatRequestOptions, LanguageModelChatResponse } from '../../../interfaces';
import { getTools } from '../getTools';

type SendRequest = (
  model: LanguageModelChat,
  token?: CancellationToken,
) => (
  messages: vscode.LanguageModelChatMessage[],
  toolReferences?: readonly vscode.ChatLanguageModelToolReference[],
  options?: LanguageModelChatRequestOptions,
) => Promise<LanguageModelChatResponse>;

export const sendRequest: SendRequest = (model, token) => async (messages, toolReferences = [], options = {}) => {
  // Convert tool references to actual tool objects
  const tools = getTools(toolReferences);

  // Merge tools into options
  const requestOptions: LanguageModelChatRequestOptions = {
    ...options,
    ...(tools.length > 0 && { tools }),
  };

  return model.sendRequest(messages, requestOptions, token);
};
