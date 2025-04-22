# Chatherine - VS Code Chat Participant Extension

Chatherine is a chat assistant for Visual Studio Code that helps you get more out of GitHub Copilot and your workspace documentation.

## Features

- 💬 Chat directly with Chatherine in the VS Code chat window
- ✨ Refine your prompts for Copilot using best practices
- 📝 Search and summarize your project documentation
- 🧹 Run stateless (no history) Copilot requests

## Installation
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Chatherine"
4. Click Install

Or download the [extension file](extension.vsix) and install manually:
```sh
code --install-extension path/to/extension.vsix --force
```

### Documentation Includes/Excludes
```json
"chatherine.documentation.exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/out/**",
    "**/coverage/**",
    "**/lib/**",
    "**/bin/**",
    "**/.vscode-test/**",
    "**/init/**"
],
"chatherine.documentation.include": [
    "**/package.json",
    "**/*.md"
]
```
Will merge down in this order (if defined):
- defaultValues (above)
- globalValue
- workspaceValue
- workspaceFolderValue
- defaultLanguageValue
- globalLanguageValue
- workspaceLanguageValue
- workspaceFolderLanguageValue


## How to Use

1. Open the VS Code chat window (look for the Chatherine participant)
2. Type `/` to see available commands, or just start chatting with the default noHistory command
3. Use one of the following commands:

### Available Commands

- `/noHistory` (Default command)
  Send a prompt to Copilot without using previous chat history.

- `/refinePrompt`
  Get expert feedback to improve your prompt using the 4S principle (Simplicity, Specificity, Structure, Surround).

- `/refinePromptNoHistory`
  Refine your prompt without any chat history for unbiased suggestions.

- `/documentation`
  Search and summarize documentation (markdown and package.json files) in your workspace.

For more details on each command, see [Commands README](src/commands/README.md).

## Example Usage

In the chat window, type:
```
@chatherine /noHistory How can I refactor this function.
@chatherine /refinePrompt How do I write a function to merge two arrays?
@chatherine /refinePromptNoHistory How do I write a function to merge two arrays?
@chatherine /documentation How do I implement a new command?
```

## Requirements

- Visual Studio Code v1.99.0 or higher
- Internet connection for AI features

## Support

- [Open an issue](https://github.com/WillWillman/chatherine/issues) for bugs or questions.

## Contributing

Contributions are welcome! Please see our [contributing guidelines](CONTRIBUTING.md) for more details.

Check out [chathy](chathy/README.md) api to build your own extension.

## License

[MIT License](LICENSE)
