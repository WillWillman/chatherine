import * as vscode from 'vscode';
import { RegisterCommand } from '../interfaces';

export const registerCommand: RegisterCommand = (extensionContext) => (command) => {
  const disposable = vscode.commands.registerCommand(command.name, command(extensionContext));
  extensionContext.subscriptions.push(disposable);
  return disposable;
}
