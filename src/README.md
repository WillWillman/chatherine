# Chat Participant Extension

This is the main entry point for the chat participant VS Code extension. The extension provides various commands to improve your interaction with GitHub Copilot.

## Extension Structure

The extension is activated through the `activate` function in this file, which:
- Serves as the entry point for the VS Code extension
- Registers all available commands with VS Code
- Sets up the default command

## Available Commands

For a complete overview of all available commands, see the [Commands README](../commands/README.md).

## Implementation Details

The extension uses the `@chatherine/chathy` library to:
- Activate the extension
- Register commands with VS Code
- Registers a default command
- Handle command execution including using a default command when no other command provided by the user.

The extension follows modern JavaScript practices:
- Uses arrow functions
- Employs functional programming principles
- Leverages TypeScript for type safety

## Usage

After installing the extension, commands can be accessed through VS Code chat window via the participant registered via the root package.json
