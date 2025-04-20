 
import * as vscode from 'vscode';
import { createUriMock } from './createUriMock';
import { createMemento } from './createMemento';
import { environmentVariableCollection } from './environmentVariableCollection';

export const extensionContext: vscode.ExtensionContext = {
  subscriptions: [] as vscode.Disposable[],
  workspaceState: createMemento(),
  globalState: {
    ...createMemento(),
    setKeysForSync: () => { },
  },
  extensionUri: createUriMock('/path/to/extension'),
  extensionPath: '/path/to/extension',
  environmentVariableCollection,
  asAbsolutePath: (relativePath) => `/absolute/path/${relativePath}`,
  globalStorageUri: createUriMock('/path/to/globalStorage'),
  storageUri: createUriMock('/path/to/storage'),
  logUri: createUriMock('/path/to/log'),
  extensionMode: 3,
  secrets: {
    get: () => Promise.resolve(undefined),
    store: () => Promise.resolve(undefined),
    delete: () => Promise.resolve(undefined),
    onDidChange: (() => {
      // Mock event
      return { dispose: () => { } };
    }) as unknown as vscode.Event<vscode.SecretStorageChangeEvent>,
  },
  logPath: '/path/to/log',
  storagePath: '/path/to/storage',
  globalStoragePath: '/path/to/globalStorage',
  languageModelAccessInformation: undefined,
  extension: {
    id: 'test-extension-id',
    extensionUri: createUriMock('/path/to/extension'),
    extensionPath: '/path/to/extension',
    isActive: true,
    extensionKind: 2,
    packageJSON: {
      name: 'test-extension',
      displayName: 'Test Extension',
      version: '1.0.0',
      description: 'Test extension description',
      logo: 'path/to/logo',
    },
    activate: () => Promise.resolve(undefined),
    exports: {},
  },
};
