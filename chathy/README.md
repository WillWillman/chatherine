# Chathy

A typescript framework to streamline building chat participants for VS Code.

## Installation

### Brand New Extension (See [init](/chathy/init/README.md))
  ```bash
  npx --package=@chatherine/chathy chathy init
  ```

## Usage

```typescript
// extension.ts
import * as chathy from '@chatherine/chathy';
import * as commands from './commands';

type Activate = (extensionContext: chathy.ExtensionContext) => void;
export const activate: Activate = (extensionContext) => chathy.activate(commands, commands.someCommandUsedForDefault.name)(extensionContext);

// chathy.CommandContext
type CommandContext = {
  extensionContext: chathy.ExtensionContext;
  workspaceConfiguration: chathy.WorkspaceConfiguration;
  workspaceRoot: string;
}

// chathy.ChatRequestHandler
type chatHandlerResult = chathy.ChatResult | void | undefined | null;
type ChatRequestHandler = (
  request: chathy.ChatRequest,
  context: chathy.ChatContext,
  response: chathy.ChatResponseStream,
  token: chathy.CancellationToken,
  ) => chatHandlerResult | Promise<chatHandlerResult>;

// chathy.Command
type Command = (commandContext: CommandContext) => chathy.ChatRequestHandler;
```

## Features

- Follow functional programming principles
- Provide a consistent API pattern with curried functions
- Can be used independently or combined for complete workflows

## Core Functionality

### [Activate](/chathy/src/activate/README.md)
Handles the activation of VS Code extensions, setting up command registration and participant creation. Provides utilities for extension initialization and lifecycle management.

### [Create Chat Participant](/chathy/src/createChatParticipant/README.md)
Creates a chat participant for VS Code with configurable name, icon, and command handlers. Enables interactive chat-based functionality in the VS Code interface.

### [Register Command](/chathy/src/registerCommand/README.md)
Registers commands with VS Code's command system, allowing integration of custom commands with the extension. Provides a consistent API for command registration and execution.

## Utilities

### [Utils](/chathy/src/utils/README.md)
A collection of utilities for common operations:

- [Chat Utils](/chathy/src/utils/chat/README.md) - Tools for handling chat interactions with language models
- Editor Utils (Coming Soon) - Utilities for interacting with the VS Code editor

## Model Context Protocol (MCP) Integration

Chathy supports the Model Context Protocol (MCP) servers.
- runUnitTests: Includes support for MCP-based testing via the `runUnitTests` tool

## CLI Commands

```bash
# initialize a fresh chat participant using the @chatherine/chathy package
npx chathy init

# Compile extension to vsix file
npx chathy compile:vsix

# Publish extension to VS Code Marketplace
npx chathy publish:extension

# Install extension locally forcefully from the vsix file
npx chathy install:extension

# Uninstall extension forcefully (no matter how it was installed)
npx chathy uninstall:extension

# Reinstall extension (uninstall + install)
npx chathy reinstall:extension
```

## Mocks

Chathy exposes mocks used to assist in testing, currently these are available at chathy.mocks but are likely to change so use at your own peril while this note exists here.
