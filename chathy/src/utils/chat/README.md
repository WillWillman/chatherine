# Chat Utilities

This directory contains utilities for handling chat interactions with language models in VS Code extensions.

## Primary Chat Utility

### [ChatStream](./chatStream/README.md)
Provides a high-level abstraction for handling VS Code chat requests by combining multiple chat utilities into a cohesive workflow. It processes file references, sends structured requests to the language model, and streams the response back to the VS Code chat UI.

## Granular Chat Utilities
- For when you need more control over how a chat request is processed than ChatStream offers

### [SendRequest](./sendRequest/README.md)
Simplifies the process of sending requests to a VS Code language model chat API by handling message formatting and request preparation. Converts messages to a string format and wraps them as user messages for the language model.

### [StreamResponse](./streamResponse/README.md)
Handles streaming responses from a language model chat to a VS Code chat response stream. Takes a language model response and sends text fragments to the VS Code chat UI while collecting them into a single string for possible post-processing.

### [WithFileContent](./withFileContent/README.md)
Enriches chat prompt references by adding the actual content of the referenced files. Takes a VS Code chat prompt reference and returns an enriched reference object that includes the file content.

## Common Features

- Follow functional programming principles
- Provide a consistent API pattern with curried functions
- Can be used independently or combined for complete chat workflows
- Handle VS Code's chat interfaces and language model interaction

## Examples

### Simply add instruction and use chatStream
```typescript
import * as chathy from '@chatherine/chathy';
const instructions = [
  'Optional custom instruction to adjust the LLM behavior beyond the prompt'
  { optionally: 'does not need to only be strings' }
];
export const simplifiedChatCommand: chathy.Command = (_extensionContext) => chathy.utils.chat.chatStream(instructions)
```

### Simply process request before using chatStream
```typescript
export const usingChatStreamForCommands: chathy.Command = (_extensionContext) => async (request, context, stream, token) => {
  // Process and/or adjust parts of the request (such as prompt or references) and/or context (such as history)
  return chathy.utils.chat.chatStream(['Custom Instructions'])(request, context, stream, token);
};

```

### More control without chatStream
```typescript
import * as chathy from '@chatherine/chathy';

export const customChatCommand: chathy.Command = (_extensionContext) => async (request, context, stream, token) => {
  // Get enriched file references
  const references = await Promise.all(request.references.map(chathy.utils.chat.withFileContent));

  // optionally use extensionContext if needed for workspaceState/globalState/secrets/environmentVariableCollection

  // Send request to language model
  const response = await chathy.utils.chat.sendRequest(request.model, token)([
    // optionally add additional instructions or content
    request.prompt,
    references,
    context
  ]);

  // Stream response to chat UI
  return chathy.utils.chat.streamResponse(stream)(response);
};
```
