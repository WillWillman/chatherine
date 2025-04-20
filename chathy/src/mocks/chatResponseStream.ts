/* eslint-disable @typescript-eslint/no-explicit-any */
import * as vscode from 'vscode';

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