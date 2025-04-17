# Commands

This directory contains the commands available in the chat participant extension being registered for VS Code.

## Available Commands

### [Documentation](./documentation/README.md)
Assists users in searching through documentation within a workspace. It searches markdown and `package.json` files, answers user questions, summarizes relevant documentation, and identifies outdated or conflicting documentation if applicable.

#### Configure Documentation Structure
In [workspace settings](.vscode/settings.json)

Defaults:
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
    ],
  ```

## Common Features

- Are implemented using the `chatStream` utility
- Follow a consistent interface defined by `chathy.Command`

## Usage

Used in VS code chat window with the chat participant they are registered with

```
@[chat-participant] /[command] [user prompt]
```
