import * as vscode from 'vscode';

export const cancellationToken: vscode.CancellationToken = {
  isCancellationRequested: false,
  onCancellationRequested: (() => {
    // Mock event
    return { dispose: () => { } };
  }) as unknown as vscode.Event<void>,
};
