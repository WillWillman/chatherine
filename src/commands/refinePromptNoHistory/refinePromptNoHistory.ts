import * as chathy from '@chatherine/chathy';
import { instructions } from '../refinePrompt';

export const refinePromptNoHistory: chathy.Command = (_commandContext) => async (request, context, stream, token) => {
  await chathy.utils.chat.chatStream(instructions, { maxHistoryTurns: 0 })(request, context, stream, token);
};
