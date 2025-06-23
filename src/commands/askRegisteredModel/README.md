# Ask Registered Model Command

## Overview
The `askRegisteredModel` command allows users to interact with a registered model by sending requests and receiving responses. It integrates with the Chathy framework to handle chat-based interactions.

## Functionality
- Retrieves the registered model from the global state.
- Sends requests to the registered model using a custom `sendRequest` function.
- Streams responses back to the user.

## Usage
This command is useful when you want to:
- Query a registered model that is not within copilot

## Implementation Details
The command retrieves the `registeredModel` from the global state and sends all history and context from chat to the model.

```typescript
const instructions = [
  // No additional instructions currently added
];

const askRegisteredModel: chathy.Command = (commandContext) => async (request, context, stream, token) => {
  const registeredModel: RegisteredModel = commandContext.extensionContext.globalState.get('registeredModel');

  request.model.sendRequest = sendRequest(registeredModel);

  await chathy.utils.chat.chatStream(instructions)(request, context, stream, token);
};
```

## Configuration

To use the `askRegisteredModel` command, ensure the following configuration is added to your workspace settings:

```json
"chatherine.registeredModel": {
  "endpoint": "<your-model-endpoint>",
  "apiKey": "<your-api-key>"
}
```

This configuration allows the command to connect to the registered model using the specified endpoint and API key.