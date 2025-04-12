import * as chathy from '@chatherine/chathy';
import { refinePrompt } from '../refinePrompt';

export const refinePromptNoHistory: chathy.Command = (extensionContext) => async (request, _context, stream, token) => {
  const history = [];
  await refinePrompt(extensionContext)(request, { history }, stream, token);
};
