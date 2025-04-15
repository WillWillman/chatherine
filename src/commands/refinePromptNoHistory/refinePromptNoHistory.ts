import * as chathy from '@chatherine/chathy';
import { refinePrompt } from '../refinePrompt';

export const refinePromptNoHistory: chathy.Command = (commandContext) => async (request, _context, stream, token) => {
  const history = [];
  await refinePrompt(commandContext)(request, { history }, stream, token);
};
