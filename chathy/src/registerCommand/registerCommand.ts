import * as vscode from 'vscode';
import { RegisterCommand } from '../interfaces';

export const registerCommand: RegisterCommand = (commandConfig) => (command) => {
  const disposable = vscode.commands.registerCommand(command.name, command(commandConfig));
  commandConfig.extensionContext.subscriptions.push(disposable);
  return disposable;
}
