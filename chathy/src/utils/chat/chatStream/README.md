# chatStream

The `chatStream` utility provides a high-level abstraction for handling VS Code chat requests by combining multiple chat utilities.

## Overview

`chatStream` creates a complete chat request handler that:
1. Processes file references to include their content
2. Sends a structured request to the language model
3. Streams the response back to the VS Code chat UI

This utility simplifies chat interactions by combining `withFileContent`, `sendRequest`, and `streamResponse` into a cohesive workflow.

## Usage

```typescript
import * as chathy from '@chatherine/chathy';


export const myCommand: chathy.Command = (_extensionContext) => async (request, context, stream, token) => {
  const instructions = [
    'You are an assistant which helps with a specific task',
    // add other instructions as needed
  ];
  // modify the request/context as needed before passing it to chatStream
  await chathy.utils.chat.chatStream(instructions)(request, context, stream, token);
};

```

## API

```typescript
type ChatStream = (instructions?: string[]) => vscode.ChatRequestHandler;
```

### Parameters

- `instructions` (optional): An array of string instructions to include at the beginning of every request to the model

### Returns

Returns a VS Code `ChatRequestHandler` function that handles the complete chat workflow.

## Implementation Details

The utility:
1. Uses `withFileContent` to enrich all file references with their actual content
2. Constructs a model request that includes:
   - Any provided instructions
   - The user's prompt
   - Tool references
   - Enriched file references
   - Chat context
3. Sends the request to the model using `sendRequest`
4. Streams the model's response to the chat UI using `streamResponse`

## Dependencies

This utility builds upon three other utilities:
- `withFileContent`: For enriching file references with their content
- `sendRequest`: For formatting and sending requests to the language model
- `streamResponse`: For streaming responses from the model to the VS Code chat UI
