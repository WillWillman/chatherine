# Chathy Init

A CLI tool to initialize a new VS Code chat participant extension project.

## Usage


```bash
npx --package=@chatherine/chathy chathy init
```
This command starts an interactive setup process that:

1. Prompts for essential extension details:
   - Extension name (used for package name and configuration)
   - Publisher name (username or organization)
   - Display name (shown in the VS Code UI)
   - Description (explains your extension's purpose)
   - Optionally can add a directory
      - If not it will put all the files in the directory where you run the script

2. Creates a complete, ready-to-use VS Code extension project with:
   - Extension configuration (`package.json`)
   - VS Code specific settings
   - /docs command implementation
      - Note: if you already have a command named /docs registered by another extension you will need to rename the command in this extension
   - Testing setup with Jest
   - Build configuration
   - Development workflow with nodemon

3. Installs dependancies and Installs the extension.vsix

## Example Usage
Note: After each install you must use the VS Code command pallet and choose
"Devleoper: Reload Window"
and/or
"Devleoper: Restart Extension Host"

```bash
# Initialize a new chathy enabled extension by answering prompts
npx --package=@chatherine/chathy chathy init

# Run jest tests
npm prefix=[extension-directory-initialized] run test

# Compiles and Installs Extension using nodemon to listen for changes
npm prefix=[extension-directory-initialized] dev:watch
```

## Using the chat participant
Open the VS Code chat window type
```
@[extension-name] /docs How do I implement a new command?
```

## Project Structure

The generated project follows modern JavaScript/TypeScript best practices:
- Node 20 compatibility
- TypeScript configuration
- ESLint setup
- Jest testing framework
- Functional programming style

## Extension Features

The template includes a fully functional chat participant with:

- `/docs` command for searching workspace docs
- Configurable file includes/excludes
- Integration with VS Code chat interface

## Customization

The initialization process creates placeholders for your extension's identity in all relevant files.
You can further customize the extension by modifying the generated files and adding new commands.

## Implementation Details

The initialization tool uses a recursive file copying approach with placeholder replacement
to generate a personalized extension template from a standardized source template.
