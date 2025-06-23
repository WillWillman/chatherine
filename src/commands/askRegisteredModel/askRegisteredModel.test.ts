import * as chathy from '@chatherine/chathy';
import * as vscode from 'vscode';
import { askRegisteredModel, instructions } from './askRegisteredModel';
import { sendRequest } from './sendRequest';

jest.mock('./sendRequest', () => ({
  sendRequest: jest.fn(),
}));

describe('askRegisteredModel command', () => {
  const innerChatStream = jest.fn();
  const mockRegisteredAPI = { apiKey: 'test-model', endpoint: 'https://api.example.com' };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(chathy.utils.chat, 'chatStream').mockReturnValue(innerChatStream);
    jest.spyOn(chathy.mocks.commandContext.extensionContext.globalState, 'get').mockReturnValue(mockRegisteredAPI);
    jest.spyOn(vscode.window, 'showInputBox').mockResolvedValue('gpt-4');
  });

  it('retrieves the registered model from global state', async () => {
    await askRegisteredModel(chathy.mocks.commandContext)(...chathy.mocks.handlerArgs);

    expect(chathy.mocks.commandContext.extensionContext.globalState.get).toHaveBeenCalledWith('registeredAPI');
  });

  it('calls vscode.window.showInputBox with the correct arguments', async () => {
    await askRegisteredModel(chathy.mocks.commandContext)(...chathy.mocks.handlerArgs);

    expect(vscode.window.showInputBox).toHaveBeenCalledWith({
      prompt: 'Enter model name',
      placeHolder: 'e.g., gpt-4, claude-2',
      ignoreFocusOut: true,
    });
  });

  it('assigns sendRequest to the request model', async () => {
    const mockHandlerArgs = chathy.mocks.handlerArgs;
    await askRegisteredModel(chathy.mocks.commandContext)(...mockHandlerArgs);

    expect(sendRequest).toHaveBeenCalledWith({ ...mockRegisteredAPI, model: 'gpt-4' });
  });

  it('calls chatStream with the correct instructions', async () => {
    await askRegisteredModel(chathy.mocks.commandContext)(...chathy.mocks.handlerArgs);

    expect(chathy.utils.chat.chatStream).toHaveBeenCalledWith(instructions);
    expect(innerChatStream).toHaveBeenCalledWith(...chathy.mocks.handlerArgs);
  });
});
