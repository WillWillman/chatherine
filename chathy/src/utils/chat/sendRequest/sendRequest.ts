import * as vscode from 'vscode';
import { CancellationToken, LanguageModelChat, LanguageModelChatRequestOptions, LanguageModelChatResponse } from '../../../interfaces';
type JSONValue = Parameters<JSON['stringify']>[0];

type SendRequest = (
  model: LanguageModelChat,
  token?: CancellationToken,
) => (
  messages: JSONValue[],
  options?: LanguageModelChatRequestOptions,
) => Promise<LanguageModelChatResponse>;

export const sendRequest: SendRequest = (model, token) => async (messages, options) => {
  const userMessages = messages
    .map((message) => JSON.stringify(message))
    .map((message) => vscode.LanguageModelChatMessage.User(message));

  return model.sendRequest(userMessages, options, token);
};
