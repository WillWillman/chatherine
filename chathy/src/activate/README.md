# Activate Function

The `activate` function provides a streamlined way to initialize a VS Code chat extension by encapsulating several key setup steps:

1. **Command Registration** - Registers multiple commands with the extension context
2. **Chat Participant Creation** - Creates a chat participant with the extension's name
3. **Icon Configuration** - Dynamically sets the chat participant icon based on the extension's package.json

## Function Signature

```typescript
type CommandContext = {
  extensionContext: ExtensionContext;
  workspaceConfiguration: vscode.WorkspaceConfiguration;
  workspaceRoot: string;
}
type Command = (commandContext: CommandContext) => ChatRequestHandler;
type Activate = (commands: Record<string, Command>, defaultCommand?: string) => (extensionContext: ExtensionContext) => void;
```

## Parameters

- `commands`: A record of command functions to register with the extension
- `defaultCommand`: The name of the default command to execute when no specific command is provided in a chat request
- `extensionContext`: The VS Code extension context (provided by VS Code)

## Behavior

The function:

1. Takes a collection of commands and a default command name, returning a function that accepts the extension context
2. Registers all provided commands with VS Code using the `registerCommand` utility
3. Creates a chat participant configured to use the specified default command
4. Automatically handles icon configuration based on package.json settings

## Usage

```typescript
// extension.ts
import * as vscode from 'vscode';
import * as chathy from '@chatherine/chathy';
import * as commands from './commands';

export const activate = chathy.activate(commands, 'noHistory');
```

```typescript
// commands/index.ts
export { noHistory } from './noHistory';
export { someOtherCommand } from './someOtherCommand';
```

```typescript
// commands/noHistory.ts
import * as vscode from 'vscode';
import * as chathy from '@chatherine/chathy';

export const noHistory: chathy.Command = (extensionContext) => async (request, _context, stream, token) => {
  const history = [];
  await chathy.utils.chat.chatStream(instructions)(request, { history }, stream, token);
};
```
