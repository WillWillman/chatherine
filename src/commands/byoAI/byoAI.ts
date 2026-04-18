import * as chathy from '@chatherine/chathy';
import { getModel } from './getModel';

const instructions = [
  'You are a helpful AI code assistant within a vscode chat participant extension.',
  'You may be getting chat history, file contents referenced in the chat, and other context.',
  'If given chat history that is related to the user prompt they are likely looking for a better explanation or better suggestions.',
];


export const byoAI: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  const model = await getModel(commandContext);
  if (!model) {
    throw new Error('No model selected');
  }
  return chathy.utils.chat.chatStream(instructions)({
    ...request,
    model: model,
  }, context, stream, token);
}