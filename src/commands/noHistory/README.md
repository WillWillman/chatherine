# No History Command

## Overview
The `noHistory` command allows users to interact with the Chat Participant without preserving chat history.

## Functionality
- Processes user requests without any conversation history
- Does not include any additional instruction other than the users prompt
- Does include the referenced files

## Usage
This command is useful when you want to:
- Ask a question without context from previous interactions and without creating a fresh chat
- Get responses uninfluenced by prior exchanges

## Implementation Details
The command uses the `chatStream` utility from `chathy`'s chat utilities with an empty history array to ensure each request is processed independently without context from previous interactions.

```typescript
const instructions = [];
export const noHistory: chathy.Command = (_commandContext) => async (request, _context, stream, token) => {
  await chathy.utils.chat.chatStream(instructions)(request, { history: [] }, stream, token);
};
```