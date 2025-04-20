import { Uri } from './Uri';

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
    uri: Uri,
  }],
  findFiles: jest.fn().mockResolvedValue([Uri]),
};
