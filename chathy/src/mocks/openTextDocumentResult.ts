
import * as vscode from 'vscode';
import { createUriMock } from './createUriMock';
import { fileContent } from './fileContent';

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
