# Ask Registered Model Command

## Overview
The `byoAI` command allows users to interact with third party models via a registered apiKey and url.

## Functionality
- Stores apikey and endpoint in vscode the extension secrets.
- Sends requests to the registered model using a custom `sendRequest` function.
  - The request will be sent to the third party LLM with all the context provided by the user as well as history.
  - Note: Only history that `@chatherine` was included as a participant from the given session is sent.
- Streams responses back to the user.
## Setup
- The first time you use the `/byoAI` command you will be prompted for your api key and your base URL.
  - baseUrl example: `https://api.openai.com/v1`
  - Your HTTP server must follow OpenAI specs (`/chat/completions` & `/chat/models`)
- Next choose which model you wish to use
  - Optionally add a model to use in settings (example: .vscode/settings.json)
      - ex: `"chatherine.byoAI.model": "gpt-4o"`
      - Must restart extension host each time this changes
- In order to use a new API key and endpoint open the command pallet (⌘⇧P) and select `Chatherine: Reset BYO AI Secrets`
