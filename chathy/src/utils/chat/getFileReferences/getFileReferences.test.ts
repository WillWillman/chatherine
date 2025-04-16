import * as vscode from 'vscode';
import { getFileReferences } from './getFileReferences';

describe('getFileReferences', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return references with URIs from findFiles', async () => {
    const config = {
      base: '/path/to',
      include: '**/*.ts',
    };

    const result = await getFileReferences(config);

    expect(vscode.workspace.findFiles).toHaveBeenCalledWith(
      config.include,
      null,
      undefined,
      undefined
    );
    expect(result).toEqual([
      {
        id: 'file:///path/to/mock',
        value: vscode.Uri.parse('file:///path/to/mock'),
      }
    ]);
  });

  it('should use exclude pattern when provided', async () => {
    const config = {
      base: '/path/to',
      include: '**/*.ts',
      exclude: '**/node_modules/**',
    };

    await getFileReferences(config);

    expect(vscode.workspace.findFiles).toHaveBeenCalledWith(
      config.include,
      config.exclude,
      undefined,
      undefined
    );
  });

  it('should respect maxResults when provided', async () => {
    const config = {
      base: '/path/to',
      include: '**/*.ts',
      maxResults: 10,
    };

    await getFileReferences(config);

    expect(vscode.workspace.findFiles).toHaveBeenCalledWith(
      config.include,
      null,
      config.maxResults,
      undefined
    );
  });

  it('should pass cancellation token when provided', async () => {
    const token = {} as vscode.CancellationToken;
    const config = {
      base: '/path/to',
      include: '**/*.ts',
      token,
    };

    await getFileReferences(config);

    expect(vscode.workspace.findFiles).toHaveBeenCalledWith(
      config.include,
      null,
      undefined,
      token
    );
  });

  it('should handle empty result from findFiles', async () => {
    jest.spyOn(vscode.workspace, 'findFiles').mockResolvedValue([]);

    const config = {
      base: '/path/to',
      include: '**/*.ts',
    };

    const result = await getFileReferences(config);

    expect(result).toEqual([]);
  });
});