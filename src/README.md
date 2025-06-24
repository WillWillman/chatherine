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
- **Bring Your Own AI**: Send prompt with history and context to a third party model using an api key and endpoint.
- **Documentation**: Assists in searching and analyzing documentation within a workspace.

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

## Model Context Protocol (MCP) Integration

This extension includes Model Context Protocol (MCP) integration to enable enhanced testing capabilities:

- Uses the `runUnitTests` MCP tool for executing and validating tests
- Configured via `.vscode/mcp.json` to provide project-specific MCP tools
- Integrates with the `@modelcontextprotocol/sdk` package for communication with language models
- Enables effective testing of chat-based interactions without direct API dependencies


## CodeQL Integration

This project incorporates [GitHub's CodeQL security scanning workflow](/.github/workflows/codeql-analysis.yml) to identify and prevent potential security vulnerabilities:
- Automatically analyzes both `JavaScript/TypeScrip`t code and GitHub `Actions` workflows
- Runs on every push to the repository and weekly (Thursdays at 10 PM UTC)
- Configures separate analysis paths for different language types
- Uses 'security-and-quality' query suite for comprehensive vulnerability detection
- Results are available in the repository's Security tab under ["Code scanning alerts"](https://github.com/WillWillman/chatherine/security/code-scanning)


## Usage

After installing the extension, commands can be accessed through VS Code chat window via the participant registered via the root package.json
