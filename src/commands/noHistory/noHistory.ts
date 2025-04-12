import * as chathy from '@chatherine/chathy';

const instructions = [];
export const noHistory: chathy.Command = (_extensionContext) => async (request, _context, stream, token) => {
  await chathy.utils.chat.chatStream(instructions)(request, { history: [] }, stream, token);
};
