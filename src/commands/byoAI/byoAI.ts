import * as chathy from '@chatherine/chathy';
import {
  AIClient,
  SecretClient,
  UserPromptClient,
} from './clients';

const instructions = [
  'You are a helpful AI code assistant within a vscode chat participant extension.',
  'You may be getting chat history, file contents referenced in the chat, and other context.',
  'If given chat history that is related to the user prompt they are likely looking for a better exploration or better suggestions.',
];

export const byoAI: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  const secretClient = SecretClient(commandContext);

  await UserPromptClient
    .showQuickPickYesOrNo('Reset secrets?')
    .then(isYes => isYes && secretClient.reset());

  const aiClient = AIClient({
    apiKey: await secretClient.get('apiKey'),
    endpoint: await secretClient.get('endpoint'),
  });

  const model = await aiClient
    .listModels()
    .then(models => UserPromptClient.showQuickPick('Select a model', models))
    .then(model => aiClient.getModel(model));

  await chathy.utils.chat.chatStream(instructions)({ ...request, model }, context, stream, token);
};
