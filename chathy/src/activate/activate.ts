import * as participant from '..';
import { Activate } from '../interfaces';

export const activate: Activate = (commands, defaultCommand) => (extensionContext) => {
  Object
    .values(commands)
    .forEach(participant.registerCommand(extensionContext));

  participant.createChatParticipant(
    extensionContext,
    commands[defaultCommand].name,
  );
};
