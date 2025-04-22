import * as chathy from '@chatherine/chathy';
import { docs, instructions } from './docs';
describe('docs command', () => {
  const innerChatStream = jest.fn();
  const mockReference = { id: 'test-id', value: 'test content' };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(chathy.utils.chat, 'chatStream').mockReturnValue(innerChatStream);
    jest.spyOn(chathy.utils.chat, 'getFileReferences').mockResolvedValue([{ id: 'test-id', value: 'test content' }]);
    jest.spyOn(chathy.mocks.commandContext.workspaceConfiguration, 'get').mockReturnValue(['**/*.md', '**/package.json']);
  });

  it('should run the docs command', async () => {

    await docs(chathy.mocks.commandContext)(...chathy.mocks.handlerArgs);

    jest.replaceProperty(chathy.mocks.chatContext, 'history', chathy.mocks.chatContext.history.slice(-2));
    jest.replaceProperty(chathy.mocks.chatRequest, 'references', [...chathy.mocks.chatRequest.references, mockReference]);

    expect(chathy.utils.chat.chatStream).toHaveBeenCalledWith(instructions);
    expect(innerChatStream).toHaveBeenCalledWith(...chathy.mocks.handlerArgs);
  });

});
