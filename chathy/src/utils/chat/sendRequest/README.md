# sendRequest

The `sendRequest` utility provides a function for sending chat requests to a language model.

## Overview

This utility simplifies the process of sending requests to a VS Code language model chat API by handling message formatting and request preparation. It is intended to be used inside of chat request handlers.

## Usage

```typescript
import * as chathy from '@chatherine/chathy';

export const chatRequestHandler: chathy.ChatRequestHandler = async (request, context, stream, token) => {

  const response = await chathy.utils.chat.sendRequest(request.model, token)([
      request.prompt,
      request.toolReferences,
      references,
      context,
    ])

  // Do something with response or use streamResponse to send to user

};
```

## API

```typescript
type SendRequest = (
  model: vscode.LanguageModelChat,
  token?: vscode.CancellationToken,
) => (
  messages: any[], // any that can be JSON.stringified
  options?: vscode.LanguageModelChatRequestOptions,
) => Promise<vscode.LanguageModelChatResponse>;
```

### Parameters

- `model`: The language model to send the request to (usually from the request.model but can be any that keeps the same interface)
- `token` (optional): A cancellation token for canceling the request
- `messages`: An array of values that will be stringified and sent as user messages
- `options` (optional): Additional LLM options for the request

### Returns

Returns a Promise that resolves to a `vscode.LanguageModelChatResponse` object.

## Implementation Details

The utility converts each message to a string using `JSON.stringify()` and wraps them as user messages using `vscode.LanguageModelChatMessage.User()`.
