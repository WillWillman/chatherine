import * as vscode from 'vscode';
import { sendRequest } from './sendRequest';
import * as mocks from '../../../mocks';

describe('sendRequest', () => {
  const options = { someOption: true } as vscode.LanguageModelChatRequestOptions;
  const [request, _context, _stream, token] = mocks.handlerArgs;

  const messages = [
    'message1',
    {
      text: 'test',
      code: 'const x = 1;',
      array: [1, 2, 3],
      nested: { a: 'b' },
    }
  ];

  const formattedMessages = [
    {
      "content": JSON.stringify(messages[0]),
      "role": "user"
    },
    {
      "content": JSON.stringify(messages[1]),
      "role": "user"
    }
  ];

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(request.model, 'sendRequest');
  });

  it('should work without token or options', async () => {
    await sendRequest(request.model)(messages);
    expect(request.model.sendRequest).toHaveBeenCalledWith(formattedMessages, undefined, undefined);
  });

  it('should work with token and options', async () => {
    await sendRequest(request.model, token)(messages, options);
    expect(request.model.sendRequest).toHaveBeenCalledWith(formattedMessages, options, token);
  });

});