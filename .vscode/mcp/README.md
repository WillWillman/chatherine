# Model Context Protocol (MCP) Server

This directory contains the Model Context Protocol server implementation for the Chatherine VS Code extension.

## Overview

The MCP server (`mcp.ts`) provides a bridge between the VS Code extension and various tools that can be invoked by AI models. It registers tools from the `./tools` directory and establishes a stdio transport connection for communication.

## Key Components

- `.vscode/mcp/mcp.ts`: Main server file that initializes the MCP server and registers all available tools
- `.vscode/mcp/tools/`: Directory containing all tool implementations that can be called through the MCP protocol
- `.vscode/mcp.json`: Registers the mcp projects server as stdio using ts-node to run `mcp.ts`

## How It Works

The server:
1. Imports all available tools from the tools directory
2. Creates a new MCP server instance
3. Registers each tool with its description, arguments schema, and callback function
4. Connects the server using stdio transport for communication with clients

## Usage

This MCP server is used internally by the Chatherine extension to enable AI models to perform actions within the VS Code environment.