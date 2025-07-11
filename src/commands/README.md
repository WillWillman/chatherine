# Commands

This directory contains the commands available in the chat participant extension being registered for VS Code.

## Available Commands

### [No History](/src/commands/noHistory/README.md)
Process user requests without preserving chat history. Each interaction is treated as a fresh conversation, creating a clean context for each request.

### [Refine Prompt](/src/commands/refinePrompt/README.md)
Helps engineers improve their prompts for GitHub Copilot by implementing the 4S principle (Simplicity, Specificity, Structure, Surround). Provides refined versions of prompts with explanations for changes and identifies areas needing clarification.

### [Refine Prompt No History](/src/commands/refinePromptNoHistory/README.md)
Provides the same prompt refinement capabilities as the standard `refinePrompt` command but operates without any conversation history, reducing bias in the response to the given prompt.

### [Documentation](/src/commands/documentation/README.md)
Assists users in searching through documentation within a workspace. It searches markdown and `package.json` files, answers user questions, summarizes relevant documentation, and identifies outdated or conflicting documentation if applicable.
(see documentation for customizations)

### [Bring Your Own AI](/src/commands/byoAI/README.md)
Interact with a registered AI API by sending requests and receiving responses. Useful for querying models outside of Copilot.

## Common Features

- Are implemented using the `chatStream` utility
- Follow a consistent interface defined by `chathy.Command`

## Usage

Used in VS code chat window with the chat participant they are registered with

```
@[chat-participant] /[command] [user prompt]
```
