# getFileReferences

The `getFileReferences` utility provides a function for finding files matching a glob pattern and generating chat reference objects from them.

## Overview

This utility simplifies the process of finding files in the workspace that match specified glob patterns and converting them to a format compatible with VS Code chat references. It's useful when you need to include multiple files in a chat context based on patterns rather than individual selection.

## Usage

```typescript
import * as chathy from '@chatherine/chathy';
import * as vscode from 'vscode';

export const chatRequestHandler: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  // Find all TypeScript files in the workspace
  const config = {
    base: vscode.workspace.workspaceFolders?.[0] || '',
    include: '**/*.ts',
    exclude: '**/node_modules/**',
    token, // Pass cancellation token for responsiveness
  };

  const fileReferences = await chathy.utils.chat.getFileReferences(config);

  // Enrich references with file content
  const enrichedReferences = await Promise.all(
    fileReferences.map(chathy.utils.chat.withFileContent(stream))
  );

  // Include these references in your prompt
  const response = await chathy.utils.chat.sendRequest(request.model, token)([
    request.prompt,
    ...enrichedReferences,
  ]);

  return chathy.utils.chat.streamResponse(stream)(response);
};
```

## API

```typescript
type Config = {
  base: vscode.WorkspaceFolder | vscode.Uri | string;
  include: vscode.GlobPattern;
  exclude?: vscode.GlobPattern;
  maxResults?: number;
  token?: vscode.CancellationToken;
};

type GetFileReferences = (config: Config) => Promise<ChatRequest['references']>;
```

### Parameters

- `config`: Configuration object with the following properties:
  - `base`: Base folder or URI to search from
  - `include`: Glob pattern to match files
  - `exclude` (optional): Glob pattern to exclude files
  - `maxResults` (optional): Maximum number of files to return
  - `token` (optional): Cancellation token for stopping the operation

### Returns

Returns a Promise that resolves to an array of chat references, each containing:
- `id`: String representation of the file URI
- `value`: The VS Code URI object for the file

## Implementation Details

The utility:
1. Uses VS Code's `workspace.findFiles()` API to find files matching the specified patterns
2. Transforms each resulting URI into a reference object with an ID and value
3. Returns the array of reference objects ready to be used in chat contexts
