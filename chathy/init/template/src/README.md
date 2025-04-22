# Chat Participant Extension

This is the main entry point for the chat participant VS Code extension. The extension provides various commands to improve your interaction with GitHub Copilot.

## Extension Structure

The extension is activated through the `activate` function in this file, which:
- Serves as the entry point for the VS Code extension
- Registers all available commands with VS Code
- Sets up the default command

## Available Commands
[Commands README](/src/commands/README.md).

### Key Commands
- **Docs**: Assists in searching and analyzing docs within a workspace.
  ```json
    "${USERINPUT_NAME}.docs.exclude": [
        "node_modules",
        "dist",
        "build",
        "out",
        "coverage",
        "lib",
        "bin",
        ".vscode-test"
    ],
    "${USERINPUT_NAME}.docs.include": [
        "**/package.json",
        "**/*.md"
    ],
  ```
Will merge down in this order (if defined):
- defaultValues (above set in package.json AND .vscode/settings.json for reference purposes)
- globalValue
- workspaceValue
- workspaceFolderValue
- defaultLanguageValue
- globalLanguageValue
- workspaceLanguageValue
- workspaceFolderLanguageValue

## Implementation Details

The extension uses the [`@chatherine/chathy`](https://github.com/WillWillman/chatherine/tree/main/chathy) library to:
- Activate the extension
- Register commands with VS Code
- Registers a default command
- Handle command execution including using a default command when no other command provided by the user.

## Usage

After installing the extension, commands can be accessed through VS Code chat window via the participant registered via the root package.json
