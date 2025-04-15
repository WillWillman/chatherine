import * as vscode from 'vscode';

export type ChatParticipant = vscode.ChatParticipant;
export type ChatRequestHandler = vscode.ChatRequestHandler;
export type ExtensionContext = vscode.ExtensionContext
export type ChatRequest = vscode.ChatRequest;
export type ChatContext = vscode.ChatContext;
export type ChatResponseStream = vscode.ChatResponseStream;
export type CancellationToken = vscode.CancellationToken;

export type LanguageModelChatResponse = vscode.LanguageModelChatResponse;
export type LanguageModelChatRequestOptions = vscode.LanguageModelChatRequestOptions;
export type LanguageModelChat = vscode.LanguageModelChat;

export type CommandContext = {
  extensionContext: ExtensionContext;
  workspaceConfiguration: vscode.WorkspaceConfiguration;
  workspaceRoot: string;
}

export type Command = (commandContext: CommandContext) => ChatRequestHandler;

export type Activate = (commands: Record<string, Command>, defaultCommand?: string) => (extensionContext: ExtensionContext) => void;
export type CreateChatParticipant = (ExtensionContext: ExtensionContext, defaultCommand: string) => ChatParticipant;
export type RegisterCommand = (commandContext: CommandContext) => (command: Command) => vscode.Disposable;
