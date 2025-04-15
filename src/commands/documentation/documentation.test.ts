import * as chathy from '@chatherine/chathy';
import { documentation, instructions } from './documentation';
import * as getFileReferences from './getFileReferences';
describe('documentation command', () => {
  const innerChatStream = jest.fn();
  const mockReference = { id: 'test-id', value: 'test content' };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(chathy.utils.chat, 'chatStream').mockReturnValue(innerChatStream);
    jest.spyOn(getFileReferences, 'getFileReferences').mockReturnValue([{ id: 'test-id', value: 'test content' }]);
  });

  it('should run the documentation command', async () => {

    await documentation(chathy.mocks.commandContext)(...chathy.mocks.handlerArgs);

    jest.replaceProperty(chathy.mocks.chatContext, 'history', chathy.mocks.chatContext.history.slice(-2));
    jest.replaceProperty(chathy.mocks.chatRequest, 'references', [...chathy.mocks.chatRequest.references, mockReference]);

    expect(chathy.utils.chat.chatStream).toHaveBeenCalledWith(instructions);
    expect(innerChatStream).toHaveBeenCalledWith(...chathy.mocks.handlerArgs);
  });

});
