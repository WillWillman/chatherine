import * as chathy from '@chatherine/chathy';
import { refinePrompt, instructions } from './refinePrompt';

describe('refinePrompt command', () => {
  const innerChatStream = jest.fn();
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(chathy.utils.chat, 'chatStream').mockReturnValue(innerChatStream);
  });

  it('calls chatStream with empty history', async () => {
    await refinePrompt(chathy.mocks.extensionContext)(...chathy.mocks.handlerArgs);

    expect(chathy.utils.chat.chatStream).toHaveBeenCalledWith(instructions);

    jest.replaceProperty(chathy.mocks.chatContext, 'history',  chathy.mocks.chatContext.history.slice(-2));
    expect(innerChatStream).toHaveBeenCalledWith(...chathy.mocks.handlerArgs);
  });
});
