# Documentation Command

## Overview
The `documentation` command assists users in searching through documentation within a workspace.

## Functionality
- Searches and analyzes markdown and `package.json` files in the workspace.
- Allows users to provide additional references to files in chat.
- Answers user questions based on the provided files.
- Summarizes relevant documentation.
- Identifies outdated or conflicting documentation and includes a section for it if applicable.

## Usage
This command is useful when you want to:
- Search for specific information within your project's documentation.
- Get a summary of relevant documentation for a given query.
- Ask how to implement something
- Identify and address outdated or conflicting documentation.

## Implementation Details
The command uses the `chatStream` utility from `chathy`'s chat utilities to process user requests. It gathers references to all markdown and `package.json` files in the workspace and combines them with any additional references provided by the user. The command then processes the request and generates a response based on the gathered references.

## Best Practices
Smaller Readmes closer to the code linked together that include interfaces and or the code itself when relevant

```typescript
export const instructions = [
  'You are here to assist the users in searching thorough documentation within a workspace.',
  'Main use cases:',
  'You will be provided with all of the markdown and package.json files in the workspace.',
  'The user may provide additional references to files in chat.',
  'You will answer the user question based on the files.',
  'Then you will provide a summery of the relevant documentation.',
  'Lastly if there are any outdated or conflicting documentation add a section at the end (else leave it out).',
];

export const documentation: chathy.Command = (commandContext) => async (request, context, stream, token) => {

  const extensionReferences = await chathy.utils.chat.getFileReferences({
    base: commandContext.workspaceRoot,
    include: `{${commandContext.workspaceConfiguration.get<string[]>('documentation.include').join(',')}}`,
    exclude: `{${commandContext.workspaceConfiguration.get<string[]>('documentation.exclude').join(',')}}`,
    token,
  });

  const references = [...request.references, ...extensionReferences];

  return chathy.utils.chat.chatStream(instructions)({ ...request, references }, context, stream, token);
};
```