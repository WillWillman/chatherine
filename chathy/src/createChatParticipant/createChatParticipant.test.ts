import * as vscode from 'vscode';
import * as mocks from '../mocks';
import { createChatParticipant } from './createChatParticipant';

describe('createChatParticipant', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a chat participant with the correct name', () => {
    createChatParticipant(mocks.extensionContext, mocks.defaultCommand);
    expect(vscode.chat.createChatParticipant).toHaveBeenCalledWith(mocks.extensionContext.extension.packageJSON.name, expect.any(Function));
  });

  it('should set the correct iconPath for the participant', () => {
    const participant = createChatParticipant(mocks.extensionContext, mocks.defaultCommand);
    expect(vscode.Uri.joinPath).toHaveBeenCalledWith(mocks.extensionContext.extension.extensionUri, mocks.extensionContext.extension.packageJSON.icon);
    expect(participant.iconPath).toBe(vscode.Uri.joinPath(mocks.extensionContext.extension.extensionUri, mocks.extensionContext.extension.packageJSON.icon));
  });

  it('should return the created participant', () => {
    const result = createChatParticipant(mocks.extensionContext, mocks.defaultCommand);
    expect(result.dispose).toBeDefined();
    expect(result.onDidReceiveFeedback).toBeDefined();
    expect(result.requestHandler).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.iconPath).toBeDefined();
  });

  describe('requestHandler', () => {
    it('should create a handler that executes commands with specified command', () => {
      const participant = createChatParticipant(mocks.extensionContext, mocks.defaultCommand);
      const [mockRequest, ...handlerArgs] = mocks.handlerArgs;
      jest.replaceProperty(mockRequest, 'command', 'specific.command');
      participant.requestHandler(mockRequest, ...handlerArgs);

      expect(vscode.commands.executeCommand).toHaveBeenCalledWith(
        mockRequest.command,
        ...mocks.handlerArgs,
      );
    });

    it('should create a handler that executes commands with default command when not specified', () => {
      const participant = createChatParticipant(mocks.extensionContext, mocks.defaultCommand);
      participant.requestHandler(...mocks.handlerArgs);

      expect(vscode.commands.executeCommand).toHaveBeenCalledWith(
        mocks.defaultCommand,
        ...mocks.handlerArgs,
      );
    });
  });
});
