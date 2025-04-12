import * as chathy from '@chatherine/chathy';
import { noHistory } from './noHistory';

describe('noHistory command', () => {
  const innerChatStream = jest.fn();
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(chathy.utils.chat, 'chatStream').mockReturnValue(innerChatStream);
  });

  it('calls chatStream with empty history', async () => {
    await noHistory(chathy.mocks.extensionContext)(...chathy.mocks.handlerArgs);

    expect(chathy.utils.chat.chatStream).toHaveBeenCalledWith([]);

    jest.replaceProperty(chathy.mocks.chatContext, 'history', []);
    expect(innerChatStream).toHaveBeenCalledWith(...chathy.mocks.handlerArgs);
  });
});
