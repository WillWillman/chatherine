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
- **No History**: Processes user requests without preserving chat history.
- **Refine Prompt**: Helps improve prompts using the 4S principle.
- **Refine Prompt No History**: Refines prompts without conversation history.
- **Documentation**: Assists in searching and analyzing documentation within a workspace.
      ```json
        "chatherine.documentation.exclude": [
            "node_modules",
            "dist",
            "build",
            "out",
            "coverage",
            "lib",
            "bin",
            ".vscode-test"
        ],
        "chatherine.documentation.include": [
            "**/package.json",
            "**/*.md"
        ]
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

The extension uses the [`@chatherine/chathy`](/chathy/README.md) library to:
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
