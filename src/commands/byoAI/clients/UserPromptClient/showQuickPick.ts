import * as vscode from 'vscode';

export const showQuickPick = async (placeHolder: string, options: string[]): Promise<string> =>{
  const choice = await vscode.window.showQuickPick(options, { placeHolder, ignoreFocusOut: true });
  return choice || '';
}