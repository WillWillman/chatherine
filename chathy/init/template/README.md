# ${USERINPUT_DISPLAY_NAME}

${USERINPUT_DESCRIPTION}

## Features

- 💬 Chat directly in the VS Code chat window
- 📝 Search and summarize your project documentation

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

### Documentation Includes/Excludes
```json
  "${USERINPUT_NAME}.documentation.exclude": [
      "node_modules",
      "dist",
      "build",
      "out",
      "coverage",
      "lib",
      "bin",
      ".vscode-test"
  ],
  "${USERINPUT_NAME}.documentation.include": [
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

1. Open the VS Code chat window (look for the ${USERINPUT_NAME} participant)
2. Type `/` to see available commands, or just start chatting with the default documentation command
3. Use the following command:

### Available Commands

- `/documentation` (Default command)
  Search and summarize documentation (markdown and package.json files) in your workspace.

For more details on each command, see [Commands README](src/commands/README.md).

## Example Usage

In the chat window, type:
```
@${USERINPUT_NAME} /documentation How do I implement a new command?
```
Or simply:
```
@${USERINPUT_NAME} How do I implement a new command?
```

## Requirements

- Visual Studio Code v1.99.0 or higher
- Internet connection for AI features

## Support

- [Open an issue](https://github.com/${USERINPUT_PUBLISHER}/${USERINPUT_NAME}/issues) for bugs or questions.

## License
[MIT License](LICENSE)

Check out [chathy](https://github.com/WillWillman/chatherine/tree/main/chathy) API to build your own extension!
