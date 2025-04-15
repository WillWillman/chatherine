# streamResponse

The `streamResponse` utility handles streaming responses from a language model chat to a VS Code chat response stream.

## Overview

This utility takes a chat response stream and a language model response, then streams the text fragments from the model to the VS Code chat UI while collecting them into a single string to return to the calling fn for post-processing (if needed)

## Usage

```typescript
import * as chathy from '@chatherine/chathy';

export const chatRequestHandler: chathy.ChatRequestHandler = async (request, context, stream, token) => {

  // send a request to an LLM to get a LanguageModelChatResponse
  const response = await chathy.utils.chat.sendRequest(request.model, token)([request.prompt])


  await utils.chat.streamResponse(stream)(response);

};
```

## API

```typescript
type StreamResponse = (stream: vscode.ChatResponseStream) => (response: vscode.LanguageModelChatResponse) => Promise<string>;
```

### Parameters

- `stream`: A VS Code chat response stream to send text fragments to
- `response`: A language model chat response containing a `text` key as an async iterable of text fragments

### Returns

Returns a Promise that resolves to the complete text response as a string.

## Implementation Details

The utility:
1. Creates an array to collect text fragments
2. Iterates through the async iterable of text fragments from the response
3. Pushes each fragment to the array
4. Streams each fragment to the VS Code chat UI using `stream.markdown()`
5. Finally joins all fragments and returns the complete text
