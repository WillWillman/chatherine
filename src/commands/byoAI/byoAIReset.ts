import * as chathy from '@chatherine/chathy';
import {
  SecretClient,
  UserPromptClient,
} from './clients';
export const byoAIReset: chathy.Command = (commandContext) => async () =>
  UserPromptClient
    .showQuickPickYesOrNo('Reset secrets?')
    .then(isYes => {
      if (isYes) {
        return SecretClient(commandContext).reset();
      }
    });