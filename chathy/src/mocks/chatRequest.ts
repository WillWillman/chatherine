/* eslint-disable @typescript-eslint/no-explicit-any */
import * as vscode from 'vscode';
import { createUriMock } from './createUriMock';
import { languageModelChatResponse } from './languageModelChatResponse';

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
