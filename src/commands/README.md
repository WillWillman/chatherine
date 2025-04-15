# Commands

This directory contains the commands available in the chat participant extension being registered for VS Code.

## Available Commands

### [No History](./noHistory/README.md)
Process user requests without preserving chat history. Each interaction is treated as a fresh conversation, creating a clean context for each request.

### [Refine Prompt](./refinePrompt/README.md)
Helps engineers improve their prompts for GitHub Copilot by implementing the 4S principle (Simplicity, Specificity, Structure, Surround). Provides refined versions of prompts with explanations for changes and identifies areas needing clarification.

### [Refine Prompt No History](./refinePromptNoHistory/README.md)
Provides the same prompt refinement capabilities as the standard `refinePrompt` command but operates without any conversation history, creating an unbiased context for each refinement request.

## Common Features

- Are implemented using the `chatStream` utility
- Follow a consistent interface defined by `chathy.Command`

## Usage

Used in VS code chat window with the chat participant they are registered with

```
@[chat-participant] /[command] [user prompt]
```
