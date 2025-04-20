/* eslint-disable @typescript-eslint/no-explicit-any */
import * as vscode from 'vscode';

export const environmentVariableCollection: vscode.GlobalEnvironmentVariableCollection = {
  persistent: true,
  append: () => { },
  get: () => undefined,
  forEach: () => { },
  delete: () => { },
  clear: () => { },
  replace: () => { },
  prepend: () => { },
  description: 'Mock description',
  [Symbol.iterator]: (() => { }) as any,
  getScoped: () => ({
    persistent: true,
    append: () => { },
    get: () => undefined,
    forEach: () => { },
    delete: () => { },
    clear: () => { },
    replace: () => { },
    prepend: () => { },
    description: 'Scoped Mock description',
    [Symbol.iterator]: (() => { }) as any,
  }),
};