# ${USERINPUT_DISPLAY_NAME}

${USERINPUT_DESCRIPTION}

## Features

- 💬 Chat directly in the VS Code chat window
- 📝 Search and summarize your project docs

## Requirements

- Visual Studio Code v1.99.0 or higher
- GitHub Copilot Chat Extension
- GitHub Copilot LLM Enabled
- Internet connection for AI features

## Installation
(Marketplace Coming Soon!)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "${USERINPUT_NAME}"
4. Click Install

Or download the [extension file](extension.vsix) and install manually:
```sh
code --install-extension path/to/extension.vsix --force
```

## How to Use

### Accessing the participant in Copilot Chat window
1. Install extension
2. Open the VS Code chat window (look for the ${USERINPUT_NAME} participant)
3. Type `/` to see available commands, or just start chatting with the default command
4. First time will ask for permission to send request to Copilot
5. Use one of the following commands:

### Available Commands
For more details on each command, see [Commands README](src/commands/README.md).

- `/docs` (Default command)
  Search and summarize docs (markdown and package.json files) in your workspace.

## Example Usage

```
@${USERINPUT_NAME} /docs How do I implement a new command?
```
Or using the default:
```
@${USERINPUT_NAME} How do I implement a new command?
```


### Docs Command Includes/Excludes
```json
"${USERINPUT_NAME}.docs.exclude": [
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
"${USERINPUT_NAME}.docs.include": [
    "**/package.json",
    "**/*.md"
]
```
#### Will merge down in this order (if defined):
- defaultValues (above)
- globalValue
- workspaceValue
- workspaceFolderValue
- defaultLanguageValue
- globalLanguageValue
- workspaceLanguageValue
- workspaceFolderLanguageValue

## Support

- [Open an issue](https://github.com/${USERINPUT_PUBLISHER}/${USERINPUT_NAME}/issues) for bugs or questions.

## License
[MIT License](LICENSE)

Check out [chathy](https://github.com/WillWillman/chatherine/tree/main/chathy) API to build your own extension!
