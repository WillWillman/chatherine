/* eslint-disable @typescript-eslint/no-explicit-any */
export const window = {
    showInformationMessage: jest.fn(),
    showErrorMessage: jest.fn(),
};

export const commands = {
    registerCommand: jest.fn(),
    executeCommand: jest.fn(),
};

export const Range = jest.fn();

export const Position = jest.fn();

export const TextEditor = jest.fn();

export const workspaceFolders = [];

export const Uri = {
    scheme: 'file',
    authority: '',
    path: '/path/to/mock',
    query: '',
    fragment: '',
    fsPath: '/path/to/mock',
    with: jest.fn().mockReturnThis(),
    toString: jest.fn().mockReturnValue('file:///path/to/mock'),
    toJSON: jest.fn().mockReturnValue({ $mid: 1, scheme: 'file', path: '/path/to/mock' }),
};


export const workspace = {
    getConfiguration: jest.fn().mockReturnValue({
        get: jest.fn(),
        has: jest.fn().mockReturnValue(true),
        update: jest.fn().mockResolvedValue(undefined),
        inspect: jest.fn().mockResolvedValue({
            key: 'mockKey',
        }),
    }),
    openTextDocument: jest.fn().mockResolvedValue({
        getText: jest.fn(),
        lineCount: 10,
    }),
    workspaceFolders: [{
        uri: Uri
    }],
    findFiles: jest.fn().mockResolvedValue([Uri]),
};

// Static methods for vscode.Uri
(Uri as any).joinPath = jest.fn().mockReturnValue(Uri);
(Uri as any).file = jest.fn().mockReturnValue(Uri);
(Uri as any).parse = jest.fn().mockReturnValue(Uri);
(Uri as any).from = jest.fn().mockReturnValue(Uri);

export const chat = {
    createChatParticipant: jest.fn().mockImplementation((name, handler) => ({
        id: 'id',
        iconPath: null,
        onDidReceiveFeedback: jest.fn(),
        dispose: jest.fn(),
        requestHandler: handler
    })),
}

export const LanguageModelChatMessage = {
    User: jest.fn().mockImplementation((text) => ({ role: 'user', content: text })),
    Assistant: jest.fn().mockImplementation((text) => ({ role: 'assistant', content: text })),
    System: jest.fn().mockImplementation((text) => ({ role: 'system', content: text })),
};