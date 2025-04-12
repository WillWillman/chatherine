import * as chathy from '@chatherine/chathy';
import * as refinePromptModule from '../refinePrompt';
import { refinePrompt } from '../refinePrompt';
import { refinePromptNoHistory } from './refinePromptNoHistory';

describe('refinePromptNoHistory command', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(refinePromptModule, 'refinePrompt').mockReturnValue(jest.fn());
  });

  it('calls chatStream with empty history', async () => {
    await refinePromptNoHistory(chathy.mocks.extensionContext)(...chathy.mocks.handlerArgs);

    expect(refinePrompt).toHaveBeenCalledWith(chathy.mocks.extensionContext);

    jest.replaceProperty(chathy.mocks.chatContext, 'history', []);
    expect(refinePrompt(chathy.mocks.extensionContext)).toHaveBeenCalledWith(...chathy.mocks.handlerArgs);
  });
});
