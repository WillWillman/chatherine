# Refine Prompt No History Command

## Overview
The `refinePromptNoHistory` command helps engineers improve their prompts for GitHub Copilot without preserving any conversation history.

## Functionality
- Provides the same prompt refinement capabilities as the standard `refinePrompt` command while additionally removing chat history

## Usage
This command is useful when you want to:
- Refine prompts without the influence of previous chat messages within the conversation

## Implementation Details
The command uses the same underlying functionality as the `refinePrompt` command but initializes with an empty history array. This ensures that each prompt refinement request is handled independently of any previous interactions.

```typescript
const refinePromptNoHistory: chathy.Command = (extensionContext) => async (request, _context, stream, token) => {
  const history = [];
  await refinePrompt(extensionContext)(request, { history }, stream, token);
};
```
