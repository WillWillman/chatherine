# withFileContent

The `withFileContent` utility enriches chat prompt references by adding the actual content of the referenced files.

## Overview

This utility takes a VS Code chat prompt reference (which could be a file URI, location, or file with a specific range) and retrieves the actual content of the referenced file or section. It then returns an enriched reference object that includes the file content.

## Usage

```typescript
import * as chathy from '@chatherine/chathy';

export const chatRequestHandler: chathy.ChatRequestHandler = async (request, context, stream, token) => {

  const references = await Promise.all(request.references.map(utils.chat.withFileContent));

  // sendRequest will stringify the resulting references
  const response = await utils.chat.sendRequest(request.model, token)([ request.prompt, references ])

  // Do something with response such as call streamResponse
  await utils.chat.streamResponse(stream)(response)
};
```

## API

```typescript
const withFileContent = async (reference: vscode.ChatPromptReference) =>
  Promise<vscode.ChatPromptReference & { fileContent?: string }>;
```

### Parameters

- `reference`: A VS Code chat prompt reference that can be a file URI, location with range, or a file with a specific line range

### Returns

Returns a Promise that resolves to an enriched reference object with the original reference properties plus a `fileContent` property containing the file text.

## Implementation Details

The utility:
1. Extracts the URI from the reference (handling various reference formats)
2. Opens the document using VS Code workspace API
3. Determines the range to extract (full file or specific range)
4. Gets the text content for the specified range
5. Returns an enriched reference with the original properties plus the file content
6. Handles errors gracefully, returning the original reference if content extraction fails