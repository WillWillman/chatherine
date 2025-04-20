/* eslint-disable @typescript-eslint/no-explicit-any */

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

// Static methods for vscode.Uri
(Uri as any).joinPath = jest.fn().mockReturnValue(Uri);
(Uri as any).file = jest.fn().mockReturnValue(Uri);
(Uri as any).parse = jest.fn().mockReturnValue(Uri);
(Uri as any).from = jest.fn().mockReturnValue(Uri);
