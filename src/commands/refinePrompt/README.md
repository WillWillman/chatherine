# Refine Prompt Command

## Overview
The `refinePrompt` command helps engineers improve their prompts for GitHub Copilot by providing expert guidance on prompt crafting.

## Functionality
- Analyzes the user's original prompt
- Returns a refined version of the prompt
- Provides explanations for the changes made
- Identifies unclear areas with possible clarifications

## Usage
This command is useful when you want to:
- Improve your prompt-writing skills
- Get better responses from GitHub Copilot
- Understand how to structure prompts for optimal results
- Learn the principles of good prompt engineering
- Reduce mental load, allowing experienced developers to focus on engineering a solution and not engineering a prompt

## Implementation Details
The command implements the 4S principle for prompt crafting:
- **Simplicity**: Making prompts clear and concise
- **Specificity**: Including precise details and requirements
- **Structure**: Organizing prompts in a logical manner
- **Surround**: Providing relevant context

The command preserves up to two messages of chat history to maintain context while refining prompts.

```typescript
const instructions = [
  'You are an expert in teaching engineers how to correctly craft their prompts for use with Github Copilot.',
  'IMPORTANT: You are not answering the prompt just improving it.',
  'Follow 4s principle: Simplicity, Specificity, Structure, Surround (with context).',
  'Reply in the following sections:',
  'Section: Original prompt',
  'Section: Refined prompt',
  'Section: Explanation for what changed',
  'Section: Questions that are still unclear with possible answers listed',
  'User Prompt:',
];

const refinePrompt: chathy.Command = (_extensionContext) => async (request, context, stream, token) => {
  const history = context.history.slice(-2);
  await chathy.utils.chat.chatStream(instructions)(request, { history }, stream, token);
};
```