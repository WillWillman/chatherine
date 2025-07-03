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

## Setup
- The first time you use the `/byoAI` command you will be prompted for your api key and your base URL
- Subsequent requests will ask which model you wish to use
  - Optionally add a model to use in settings ex: `"chatherine.byoAI.model": "gpt-4o"` (must restart extension host each time)
- In order to use a new API key and/or endpoint open the command pallet (⌘⇧P) and select `Chatherine: Reset BYO AI Secrets`
- Your HTTP server must follow OpenAI specs (`/chat/completions` & `/chat/models`)

