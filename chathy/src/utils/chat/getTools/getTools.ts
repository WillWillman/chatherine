import * as vscode from 'vscode';

type GetTools = (toolReferences: readonly vscode.ChatLanguageModelToolReference[]) => vscode.LanguageModelChatTool[];

export const getTools: GetTools = (toolReferences) => {
  if (!toolReferences || toolReferences.length === 0) {
    return [];
  }

  const toolNames = new Set(toolReferences.map((ref) => ref.name));
  const availableTools = vscode.lm.tools;

  return availableTools
    .filter((tool) => toolNames.has(tool.name))
    .map((toolInfo) => ({
      name: toolInfo.name,
      description: toolInfo.description,
      inputSchema: toolInfo.inputSchema,
    }));
};
