import * as vscode from 'vscode';
import * as mocks from '../mocks';
import { registerCommand } from './registerCommand';

describe('registerCommand', () => {
  const mockCommand = jest.fn().mockReturnValue(jest.fn());
  const mockDisposable = { dispose: jest.fn() };
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(vscode.commands, 'registerCommand').mockReturnValue(mockDisposable);
    mocks.extensionContext.subscriptions.length = 0;
  });

  it('should register a command with vscode and push to subscriptions', () => {
    const result = registerCommand(mocks.commandContext)(mockCommand);

    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(mockCommand.name, expect.any(Function));
    expect(mocks.extensionContext.subscriptions).toContain(mockDisposable);
    expect(mockCommand).toHaveBeenCalledWith(mocks.commandContext);
    expect(result).toBe(mockDisposable);
  });

});
