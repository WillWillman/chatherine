 
import * as vscode from 'vscode';

export const workspaceConfiguration: vscode.WorkspaceConfiguration = {
  get: () => '',
  has: () => true,
  update: () => Promise.resolve(undefined),
  inspect: () => ({
    key: 'mockKey',
  }),
};