/* eslint-disable @typescript-eslint/no-explicit-any */
import * as vscode from 'vscode';

const createUriMock = (path: string): vscode.Uri => ({
  scheme: 'file',
  authority: '',
  path,
  query: '',
  fragment: '',
  fsPath: path,
  with: () => createUriMock(path),
  toJSON: () => ({ path }),
});

export const defaultCommand = 'default.command';

export const languageModelChatResponse = (textFrags: string[]): vscode.LanguageModelChatResponse => {
  const clonedFrags = [...textFrags];
  return {
    stream: (async function* () {
      for (let i = 0; i < clonedFrags.length; i++) {
        yield clonedFrags[i];
      }
    })(),
    text: (async function* () {
      for (let i = 0; i < clonedFrags.length; i++) {
        yield clonedFrags[i];
      }
    })(),
  }
};

export const chatRequest: vscode.ChatRequest = {
  command: null,
  prompt: '',
  references: [
    {
      id: 'test.txt',
      value: createUriMock('/path/to/test.txt'),
    },
  ],
  toolReferences: [],
  model: {
    id: 'mock-model-id',
    name: 'Mock Model',
    version: '1.0.0',
    vendor: 'Mock Vendor',
    family: 'Mock Family',
    maxInputTokens: 1000,
    sendRequest: async (_messages, _options, _token) => languageModelChatResponse,
    countTokens: (_input: string) => Promise.resolve(42),
  },
} as any;

export const chatContext: vscode.ChatContext = {
  history: [],
};

// Create a simple function that returns itself for chaining
const createChainableFunction = () => {
  const fn = (..._args: any[]) => fn;
  return fn;
};

export const chatResponseStream: vscode.ChatResponseStream = {
  markdown: createChainableFunction(),
  progress: createChainableFunction(),
  button: createChainableFunction(),
  reference: createChainableFunction(),
  anchor: createChainableFunction(),
  push: createChainableFunction(),
  filetree: createChainableFunction(),
};

const cancellationToken: vscode.CancellationToken = {
  isCancellationRequested: false,
  onCancellationRequested: (() => {
    // Mock event
    return { dispose: () => { } };
  }) as unknown as vscode.Event<void>,
};

export const handlerArgs: Parameters<vscode.ChatRequestHandler> = [
  chatRequest,
  chatContext,
  chatResponseStream,
  cancellationToken,
];

const createMemento = (): vscode.Memento => ({
  get: (_key: string, defaultValue?: any) => defaultValue,
  update: () => Promise.resolve(undefined),
  keys: () => [],
});

const environmentVariableCollection: vscode.GlobalEnvironmentVariableCollection = {
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


export const extensionContext: vscode.ExtensionContext = {
  subscriptions: [] as vscode.Disposable[],
  workspaceState: createMemento(),
  globalState: {
    ...createMemento(),
    setKeysForSync: () => { },
  },
  extensionUri: createUriMock('/path/to/extension'),
  extensionPath: '/path/to/extension',
  environmentVariableCollection: environmentVariableCollection,
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

export const fileContent = 'sample file content';
export const openTextDocumentResult = {
  getText: () => fileContent,
  lineCount: 10,
  uri: createUriMock('/mock/file.txt'),
  fileName: 'mockFile.txt',
  isUntitled: false,
  languageId: 'plaintext',
  version: 1,
  isDirty: false,
  isClosed: false,
  save: () => Promise.resolve(true),
  eol: 1,
  lineAt: (position: vscode.Position | number) => {
    const line = typeof position === 'number' ? position : position.line;
    return {
      lineNumber: line,
      text: 'mock line text',
      range: new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, 10)),
      rangeIncludingLineBreak: new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, 11)),
      firstNonWhitespaceCharacterIndex: 0,
      isEmptyOrWhitespace: false,
    };
  },
  offsetAt: () => 0,
  positionAt: (offset: number) => new vscode.Position(0, offset),
  validateRange: (range: vscode.Range) => range,
  validatePosition: (position: vscode.Position) => position,
  getWordRangeAtPosition: (position: vscode.Position) => new vscode.Range(position, new vscode.Position(position.line, position.character + 5)),
} as vscode.TextDocument;
