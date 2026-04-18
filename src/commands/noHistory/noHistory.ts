import * as chathy from '@chatherine/chathy';

const instructions = [];
export const noHistory: chathy.Command = (_commandContext) => async (request, context, stream, token) => {
  await chathy.utils.chat.chatStream(instructions, { maxHistoryTurns: 0 })(request, context, stream, token);
};
