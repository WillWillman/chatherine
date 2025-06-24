# Ask Registered Model Command

## Overview
The `byoAI` command allows users to interact with a registered model by sending requests and receiving responses. It integrates with the Chathy framework to handle chat-based interactions.

## Functionality
- Retrieves the registered model from the global state.
- Sends requests to the registered model using a custom `sendRequest` function.
- Streams responses back to the user.

## Usage
This command is useful when you want to:
- Query a registered model that is not within copilot

## Implementation Details
The command retrieves the `registeredModel` from the global state and sends all history and context from chat to the model.

## Setup
- The first time you use the `/byoAI` command you will be prompted for your api key and your base URL
- In order to use a new API key and/or endpoint open the command pallet (⌘⇧P) and select `Chatherine: Reset BYO AI Secrets`
- Your HTTP server must follow OpenAI specs (`/chat/completions` & `/chat/models`)

```typescript
const instructions = [
  'You are a helpful AI code assistant within a vscode chat participant extension.',
  'You may be getting chat history, file contents referenced in the chat, and other context.',
  'If given chat history that is related to the user prompt they are likely looking for a better explanation or better suggestions.',
];

export const byoAI: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  const secretClient = SecretClient(commandContext);
  
  const aiClient = AIClient({
    apiKey: await secretClient.get('apiKey'),
    endpoint: await secretClient.get('endpoint'),
  });

  const model = await aiClient
    .listModels()
    .then(models => UserPromptClient.showQuickPick('Select a model', models))
    .then(model => aiClient.getModel(model));

  await chathy.utils.chat.chatStream(instructions)({ ...request, model }, context, stream, token);
};
```