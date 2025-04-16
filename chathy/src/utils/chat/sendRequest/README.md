# sendRequest

The `sendRequest` utility provides a function for sending chat requests to a language model.

## Overview

This utility simplifies the process of sending requests to a VS Code language model chat API by handling message formatting and request preparation. It is intended to be used inside of chat request handlers.

## Usage

```typescript
import * as chathy from '@chatherine/chathy';

export const chatRequestHandler: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  const optionsLLM = {
    // add options based on your model selection
  };

  const response = await chathy.utils.chat.sendRequest(request.model, token)([
      request.prompt,
      request.toolReferences,
      references,
      context,
    ], optionsLLM)

  // Do something with response or use streamResponse to send to user

};
```

## API

```typescript
type JSONValue = Parameters<JSON['stringify']>[0];

type SendRequest = (
  model: LanguageModelChat,
  token?: CancellationToken,
) => (
  messages: JSONValue[],
  options?: LanguageModelChatRequestOptions,
) => Promise<LanguageModelChatResponse>;

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
