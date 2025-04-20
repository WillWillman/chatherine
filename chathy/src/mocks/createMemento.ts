/* eslint-disable @typescript-eslint/no-explicit-any */
import * as vscode from 'vscode';

export const createMemento = (): vscode.Memento => ({
  get: (_key: string, defaultValue?: any) => defaultValue,
  update: () => Promise.resolve(undefined),
  keys: () => [],
});
