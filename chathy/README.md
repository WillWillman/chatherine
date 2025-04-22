# Chathy

A typescript framework to streamline building chat participants for VS Code.

## Setup
### Initializing a new Chat Participant (See [init](/chathy/init/README.md))
```bash
npx --package=@chatherine/chathy chathy init
```

### Installing into an existing package
```bash
npm install @chatherine/chathy
```

## Usage
```typescript
// extension.ts
import * as chathy from '@chatherine/chathy';
import * as commands from './commands';

type Activate = (extensionContext: chathy.ExtensionContext) => void;
export const activate: Activate = (extensionContext) => chathy.activate(commands, commands.someCommandUsedForDefault.name)(extensionContext);
```

### Important Interfaces
```typescript
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

## Core Functionality

### [Activate](/chathy/src/activate/README.md)
Handles the activation of VS Code extensions, setting up command registration and participant creation. Provides utilities for extension initialization and lifecycle management.

### [Create Chat Participant](/chathy/src/createChatParticipant/README.md)
Creates a chat participant for VS Code with configurable name, icon, and command handlers. Enables interactive chat-based functionality in the VS Code interface.

### [Register Command](/chathy/src/registerCommand/README.md)
Registers commands with VS Code's command system, allowing integration of custom commands with the extension. Provides a consistent API for command registration and execution.

### [Utils](/chathy/src/utils/README.md)
A collection of utilities for command developement:

- [Chat Utils](/chathy/src/utils/chat/README.md) - Tools for handling chat interactions with language models
- Editor Utils (Coming Soon) - Utilities for interacting with the VS Code editor

## CLI Commands

```bash
# initialize a fresh chat participant using the @chatherine/chathy package
npx chathy init

# (COMING SOON) initialize a new MCP based tool
# npx chathy init-mcp-tool

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

## Model Context Protocol (MCP) Integration
Example MCP used internally for development: [runUnitTests](/.vscode/mcp/README.md)

## Mocks

Chathy exposes mocks used to assist in testing `chathy.mocks` (Dog fed into chatherine extension)

Note: May change implementation so use at your own peril while this note exists!
