import * as chathy from '@chatherine/chathy';

export const instructions = [
  'You are an expert in teaching engineers how to correctly craft their prompts for use with Github Copilot.',
  'IMPORTANT: You are not answering the prompt just improving it.',
  'Follow 4s principle: Simplicity, Specificity, Structure, Surround (with context).',
  'Reply in the following sections:',
  'Section: Original prompt',
  'Section: Refined prompt',
  'Section: Explanation for what changed',
  'Section: Questions that are still unclear with possible answers listed',
  'User Prompt:',
];

export const refinePrompt: chathy.Command = (_extensionContext) => async (request, context, stream, token) => {
  const history = context.history.slice(-2);
  await chathy.utils.chat.chatStream(instructions)(request, { history }, stream, token);
};
