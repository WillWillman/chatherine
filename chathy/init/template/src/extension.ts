import * as chathy from '@chatherine/chathy';
import * as commands from './commands';

type Activate = (extensionContext: chathy.ExtensionContext) => void;
export const activate: Activate = (extensionContext) => chathy.activate(commands, commands.docs.name)(extensionContext);
