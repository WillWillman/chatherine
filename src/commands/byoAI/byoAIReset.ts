import {
  SecretClient,
  UserPromptClient,
} from './clients';

export const byoAIReset = (commandContext) => () =>
  UserPromptClient
    .showQuickPickYesOrNo('Reset secrets?')
    .then(isYes => isYes && SecretClient(commandContext).reset());