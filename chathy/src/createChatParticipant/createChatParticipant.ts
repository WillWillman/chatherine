import * as vscode from 'vscode';
import { ChatRequestHandler, CreateChatParticipant } from '../interfaces';


export const createChatParticipant: CreateChatParticipant = (ExtensionContext, defaultCommand) => {

  const handler: ChatRequestHandler = (request, ...args) =>
    vscode.commands.executeCommand(
      request.command || defaultCommand,
      request,
      ...args,
    );

    const participant = vscode.chat.createChatParticipant(ExtensionContext.extension.packageJSON.name, handler);

    participant.iconPath = vscode.Uri.joinPath(ExtensionContext.extension.extensionUri, ExtensionContext.extension.packageJSON.icon);
  return participant;
};
