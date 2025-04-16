# Create Chat Participant Function

The `createChatParticipant` function creates a VS Code chat participant with the extension's name and configures it with appropriate handlers and icon.

## Function Signature

```typescript
type CreateChatParticipant = (ExtensionContext: ExtensionContext, defaultCommand: string) => ChatParticipant;
```

## Parameters

- `ExtensionContext`: The VS Code extension context (provided by VS Code via activate)
- `defaultCommand`: The name of the default command to execute when no specific command is provided in a chat request

## Return Value

Returns a configured VS Code `ChatParticipant` object.

## Behavior

The function:

1. Creates a request handler that forwards chat requests to the appropriate VS Code command (either specified in the request or falling back to the default command)
2. Instantiates a new chat participant using the extension's name from package.json
3. Sets the participant's icon path based on the icon specified in package.json
4. Returns the fully configured chat participant

## Usage

```typescript
import * as chathy from '@chatherine/chathy';
import * as commands from './commands';

export const activate = (context: chathy.ExtensionContext) => {
  // Don't forget to register commands!
  // Object.values(commands).map(chathy.registerCommand(context));

  const participant = chathy.createChatParticipant(context, 'defaultCommand');
};
```
