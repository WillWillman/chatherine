import * as vscode from 'vscode';

/**
 * Extract text content from a ChatResponseTurn
 */
export const extractTextContent = (turn: vscode.ChatResponseTurn): string => {
  const textParts: string[] = [];

  for (const part of turn.response) {
    if (part instanceof vscode.LanguageModelTextPart) {
      textParts.push(part.value);
    }
  }

  return textParts.join('');
};
