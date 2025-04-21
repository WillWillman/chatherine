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

2. Creates a complete, ready-to-use VS Code extension project with:
   - Extension configuration (`package.json`)
   - VS Code specific settings
   - Documentation command implementation
   - Testing setup with Jest
   - Build configuration
   - Development workflow with nodemon

## Example Usage

```bash
# Initialize a new chathy enabled extension & answer prompts (see above)
npx chathy init

# install dependencies
npm install

# Compile + bundle the js and create the extension.vsix file
npm run compile

# Run jest tests
npm run test

# Compiles and Installs Extension using nodemon to listen for changes
npm run dev

# Use the command pallet "Developer: Reload Window"
```

## Using the chat participant
Open the VS Code chat window type
```
@[extension-name] /documentation How do I implement a new command?
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

- `/documentation` command for searching workspace documentation
- Configurable file includes/excludes
- Integration with VS Code chat interface

## Customization

The initialization process creates placeholders for your extension's identity in all relevant files.
You can further customize the extension by modifying the generated files and adding new commands.

## Implementation Details

The initialization tool uses a recursive file copying approach with placeholder replacement
to generate a personalized extension template from a standardized source template.
