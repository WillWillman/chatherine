# Chathy

A typescript framework to streamline building chat participants for VS Code.

## Installation

```bash
npm install @chatherine/chathy
# npx chathy init coming soon!
```

## Usage

```typescript
// extension.ts
import * as vscode from 'vscode';
import * as chathy from '@chatherine/chathy';
import * as commands from './commands';

export const activate = chathy.activate(commands, commands.someCommandUsedForDefault.name);
```

## Features

- Follow functional programming principles
- Provide a consistent API pattern with curried functions
- Can be used independently or combined for complete workflows

### Core Functionality

#### [Activate](./src/activate/README.md)
Handles the activation of VS Code extensions, setting up command registration and participant creation. Provides utilities for extension initialization and lifecycle management.

#### [Create Chat Participant](./src/createChatParticipant/README.md)
Creates a chat participant for VS Code with configurable name, icon, and command handlers. Enables interactive chat-based functionality in the VS Code interface.

#### [Register Command](./src/registerCommand/README.md)
Registers commands with VS Code's command system, allowing integration of custom commands with the extension. Provides a consistent API for command registration and execution.

### Utilities

#### [Utils](./src/utils/README.md)
A collection of utilities for common operations:

- [Chat Utils](./src/utils/chat/README.md) - Tools for handling chat interactions with language models
- Editor Utils (Coming Soon) - Utilities for interacting with the VS Code editor

## CLI Commands

```bash
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

# Initialize a new Chat Participant project (Coming Soon)
npx chathy init
```

## Mocks

Chathy exposes mocks used to assist in testing, currently these are available at chathy.mocks but are likely to change so use at your own peril while this note exists here.
