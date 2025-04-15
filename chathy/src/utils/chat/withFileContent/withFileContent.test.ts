import * as vscode from 'vscode';
import { withFileContent } from './withFileContent';
import * as mocks from '../../../mocks';

describe('withFileContent', () => {
  const [_, __, stream] = mocks.handlerArgs;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(vscode.workspace, 'openTextDocument').mockResolvedValue(mocks.openTextDocumentResult);
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(mocks.openTextDocumentResult, 'getText');
  });

  it('should add file content to reference when URI is provided as Location', async () => {
    const reference = {
      id: 'test-file',
      value: {
        uri: vscode.Uri.parse('file:///path/to/test.txt'),
        range: new vscode.Range(
          new vscode.Position(0, 0),
          new vscode.Position(5, 0),
        ),
      },
    };

    const result = await withFileContent(stream)(reference);

    expect(vscode.workspace.openTextDocument).toHaveBeenCalledWith(reference.value.uri);
    expect(mocks.openTextDocumentResult.getText).toHaveBeenCalledWith(reference.value.range);
    expect(result).toEqual({ ...reference, fileContent: mocks.fileContent });
  });

  it('should add file content to reference when URI is provided as string', async () => {
    const reference = {
      id: 'test-file',
      value: 'file:///path/to/test.txt',
      range: [2, 5] as [number, number],
    };

    const result = await withFileContent(stream)(reference);

    expect(vscode.workspace.openTextDocument).toHaveBeenCalledWith(vscode.Uri.parse(reference.value));
    expect(mocks.openTextDocumentResult.getText).toHaveBeenCalledWith(
      new vscode.Range(
        new vscode.Position(2, 0),
        new vscode.Position(5, 0),
      )
    );
    expect(result).toEqual({ ...reference, fileContent: mocks.fileContent });
  });

  it('should add file content to reference when URI is provided as Uri object', async () => {
    const reference = {
      id: 'test-file',
      value: vscode.Uri.parse('file:///path/to/test.txt'),
    };

    const result = await withFileContent(stream)(reference);

    jest.spyOn(mocks.openTextDocumentResult, 'getText');
    expect(vscode.workspace.openTextDocument).toHaveBeenCalledWith(reference.value);
    expect(mocks.openTextDocumentResult.getText).toHaveBeenCalledWith(
      new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(mocks.openTextDocumentResult.lineCount, 0),
      )
    );
    expect(result).toEqual({ ...reference, fileContent: mocks.fileContent });
  });

  it('should return original reference and log when error occurs', async () => {
    const reference = {
      id: 'test-file',
      value: vscode.Uri.parse('file:///path/to/test.txt'),
    };
    const error = new Error('Test error');
    jest.spyOn(vscode.workspace, 'openTextDocument').mockRejectedValue(error);

    const result = await withFileContent(stream)(reference);

    expect(vscode.workspace.openTextDocument).toHaveBeenCalledWith(reference.value);
    expect(console.error).toHaveBeenCalledWith('Chatherine: Error getting file content:', error);
    expect(result).toEqual(reference);
  });
});
