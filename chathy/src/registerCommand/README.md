# Register Command Function

The `registerCommand` function provides a convenient way to register VS Code commands within an extension context.

## Function Signature

```typescript
type RegisterCommand = (extensionContext: vscode.ExtensionContext) => (command: Command) => vscode.Disposable;
```

## Parameters

- `extensionContext`: The VS Code extension context (provided by VS Code via activate)
- `command`: A command function that accepts the extension context and returns a chat request handler

## Return Value

Returns a VS Code `Disposable` object that can be used to unregister the command later. Disposables will automatically be unregistered when the extension deactivates.

## Behavior

The function:

1. Takes an extension context and returns a function that can register commands
2. Registers the command with VS Code using the command's name
3. Adds the disposable to the extension context's subscriptions array to ensure proper cleanup
4. Returns the disposable object

## Usage

```typescript
import * as chathy from '@chatherine/chathy';
import * as commands from './commands';

const myCommand: chathy.Command = (context) => async (request, _context, stream, token) => {
  // Command implementation here
};

export const activate = (context: chathy.ExtensionContext) => {
  // Register a single command
  const disposable = chathy.registerCommand(context)(myCommand);

  // Or register multiple commands
  const disposables = Object.values(commands).map(chathy.registerCommand(context));

  // Don't forget to create the chat participant!
  // const participant = chathy.createChatParticipant(context, 'defaultCommand');
};
```
