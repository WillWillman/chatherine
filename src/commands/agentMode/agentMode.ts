import * as chathy from '@chatherine/chathy';
import { getModel } from '../byoAI/getModel';

const instructions = [
  'You are an AI assistant in agent mode - focused on execution and action.',
  'Your primary role is to:',
  '- Execute tasks efficiently and directly',
  '- Use available tools to accomplish goals',
  '- Make code changes and modifications',
  '- Provide concise explanations',
  'Focus on getting things done rather than extensive planning.',
  'Use tools whenever appropriate to complete tasks.',
];

export const agentMode: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  stream.progress('⚡ Agent mode: Executing...');

  const model = await getModel(commandContext);
  if (!model) {
    throw new Error('No model selected');
  }

  return chathy.utils.chat.chatStream(instructions, {
    maxHistoryTurns: 3,  // Less history for efficiency
    maxReferencesCount: 5,  // Fewer references to reduce token usage
  })({
    ...request,
    model,
  }, context, stream, token);
};
