import * as chathy from '@chatherine/chathy';
import * as vscode from 'vscode';
import { sendRequest } from './sendRequest';

type RegisteredAPI = {
  apiKey: string;
  endpoint: string;
}

export const instructions = [
];

export const askRegisteredModel: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  const registeredAPI: RegisteredAPI = commandContext.extensionContext.globalState.get('registeredAPI');

  const model = await vscode.window.showInputBox({
    prompt: 'Enter model name',
    placeHolder: 'e.g., gpt-4, claude-2',
    ignoreFocusOut: true,
  });

  request.model.sendRequest = sendRequest({ ...registeredAPI, model });

  await chathy.utils.chat.chatStream(instructions)(request, context, stream, token);
};
