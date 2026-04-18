import * as chathy from '@chatherine/chathy';
import { getModel } from '../byoAI/getModel';

const instructions = [
  'You are an AI assistant in plan mode - focused on research, analysis, and planning.',
  'Your primary role is to:',
  '- Understand and clarify user requirements',
  '- Research and analyze the codebase thoroughly',
  '- Ask clarifying questions when needed',
  '- Provide detailed plans and recommendations',
  '- Explain tradeoffs and alternatives',
  'DO NOT execute changes or modify files - only plan and recommend.',
  'When you have a plan, present it clearly with numbered steps.',
];

export const planMode: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  stream.progress('🔍 Plan mode: Researching and analyzing...');

  const model = await getModel(commandContext);
  if (!model) {
    throw new Error('No model selected');
  }

  return chathy.utils.chat.chatStream(instructions, {
    maxHistoryTurns: 10,  // More history for better context
    maxReferencesCount: 20,  // More references for thorough research
  })({
    ...request,
    model,
  }, context, stream, token);
};
