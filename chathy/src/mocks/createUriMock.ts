 
import * as vscode from 'vscode';

export const createUriMock = (path: string): vscode.Uri => ({
  scheme: 'file',
  authority: '',
  path,
  query: '',
  fragment: '',
  fsPath: path,
  with: () => createUriMock(path),
  toJSON: () => ({ path }),
});