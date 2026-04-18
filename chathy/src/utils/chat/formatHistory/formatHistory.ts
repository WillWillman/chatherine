import * as vscode from 'vscode';

type FormatHistory = (history: readonly (vscode.ChatRequestTurn | vscode.ChatResponseTurn)[]) => Array<{
  role: string;
  content: string;
}>;

export const formatHistory: FormatHistory = (history) =>
  history
    .map((turn) => {
      if (turn instanceof vscode.ChatRequestTurn) {
        return {
          role: 'user',
          content: turn.prompt,
        };
      }

      if (turn instanceof vscode.ChatResponseTurn) {
        // Extract text content from response
        const content = turn.response
          .map((part) => {
            if (part instanceof vscode.ChatResponseMarkdownPart) {
              return part.value.value;
            }
            return '';
          })
          .filter(Boolean)
          .join('\n');

        return {
          role: 'assistant',
          content,
        };
      }

      return null;
    })
    .filter((item): item is { role: string; content: string } => item !== null);
