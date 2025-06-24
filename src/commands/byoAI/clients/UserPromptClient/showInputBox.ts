import * as vscode from 'vscode';

export const showInputBox = (prompt) =>
  vscode.window.showInputBox({ prompt, ignoreFocusOut: true });