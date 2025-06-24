import * as vscode from 'vscode';

export const showQuickPick = async (placeHolder, options) =>
  vscode.window.showQuickPick(options, { placeHolder, ignoreFocusOut: true });
