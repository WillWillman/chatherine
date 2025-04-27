import * as tools from './tools';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

export const mcp = () => {
  const server = new McpServer({ name: 'project-mcp', version: '0.1.0' });

  Object.entries(tools).map(([name, tool]) => {
    console.log(`Registering tool: ${name}`);
    server.tool(
      name,
      tool.description,
      tool.args,
      tool.toolCallback,
    );
  });

  server.connect(new StdioServerTransport());
};
