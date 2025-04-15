import * as participant from '..';
import * as mocks from '../mocks';
import * as vscode from 'vscode';
import { activate } from './activate';

describe('activate', () => {
  const mockCommandHandler = jest.fn(v => v);
  const commands = {
    command1: () => () => { },
    command2: () => () => { },
    commandDefault: () => () => { },
  } as Record<string, participant.Command>;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(participant, 'registerCommand').mockReturnValue(mockCommandHandler);
    jest.spyOn(participant, 'createChatParticipant').mockReturnValue({
      id: 'id',
      onDidReceiveFeedback: jest.fn(),
      dispose: jest.fn(),
      requestHandler: mockCommandHandler
    });
  });

  it('should register the expected commands', () => {

    const activateWithCommands = activate(commands, commands.commandDefault.name);
    activateWithCommands(mocks.extensionContext);

    expect(participant.registerCommand).toHaveBeenCalledWith({
      extensionContext: mocks.extensionContext,
      workspaceConfiguration: vscode.workspace.getConfiguration(''),
      workspaceRoot: '/path/to/mock',
    });
    expect(participant.registerCommand).toHaveBeenCalledTimes(1);

    expect(mockCommandHandler).toHaveReturnedWith(commands.command1);
    expect(mockCommandHandler).toHaveReturnedWith(commands.command2);
    expect(mockCommandHandler).toHaveReturnedWith(commands.commandDefault);
    expect(mockCommandHandler).toHaveBeenCalledTimes(3);
  });

  it('creates a chat participant with the default command name', () => {
    const activateWithCommands = activate(commands, commands.commandDefault.name);
    activateWithCommands(mocks.extensionContext);

    expect(participant.createChatParticipant).toHaveBeenCalledWith(
      mocks.extensionContext,
      commands.commandDefault.name,
    );
  });

  it('uses specified command when different default is provided', () => {
    const activateWithCommands = activate(commands, commands.command1.name);
    activateWithCommands(mocks.extensionContext);

    expect(participant.createChatParticipant).toHaveBeenCalledWith(
      mocks.extensionContext,
      commands.command1.name,
    );
  });
});
