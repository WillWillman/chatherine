# Run Unit Tests Tool

This MCP tool enables running Jest unit tests directly from AI interactions within VS Code.

## Overview

The `runUnitTests.ts` tool provides a standardized interface for executing the project's test suite with optional filtering capabilities. It's integrated into the Model Context Protocol (MCP) framework to allow AI assistants to validate code changes by running tests.

## Features

- Run tests from the specified working directory (typically the workspace root)
- Filter tests with an optional pattern parameter
- Returns structured test results with passed/failed counts and detailed assertion information

## Implementation Details

The tool:
1. Uses the project's npm test script with a JSON reporter
2. Processes test results through the `onResponse` utility to format them into a more consumable structure
3. Returns detailed information on test status, passed/failed counts, and failure messages

## Usage Example

When invoked through the MCP protocol, this tool:
- Requires a `cwd` parameter specifying the working directory
- Accepts an optional `pattern` parameter to filter specific tests
- Returns a structured object with test results that are easy to interpret

## Response Format

The tool returns a structured object containing:
- `success`: Boolean indicating if all tests passed
- `passed`: Number of passed tests
- `failed`: Number of failed tests
- `results`: An object containing arrays of passed and failed test assertions with details

Tip:
Add 'validate using the `runUnitTests` MCP tool' to your `copilot-instructions.md` file so that copilot will use this tool whenever its relevant to do so!
