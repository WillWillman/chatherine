import * as vscode from 'vscode';
import * as participant from '..';
import { Activate } from '../interfaces';

export const activate: Activate = (commands, defaultCommand) => (extensionContext) => {
  const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const workspaceConfiguration = vscode.workspace.getConfiguration(extensionContext.extension.packageJSON.name);

  Object
    .values(commands)
    .forEach(participant.registerCommand({
      extensionContext,
      workspaceConfiguration,
      workspaceRoot,
    }));

  participant.createChatParticipant(
    extensionContext,
    commands[defaultCommand].name,
  );
};
