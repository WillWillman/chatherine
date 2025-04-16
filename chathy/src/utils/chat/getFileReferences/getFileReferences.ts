import * as vscode from 'vscode';
import { ChatRequest } from '../../../interfaces';

export type Config = {
  base: vscode.WorkspaceFolder | vscode.Uri | string;
  include: vscode.GlobPattern;
  exclude?: vscode.GlobPattern;
  maxResults?: number;
  token?: vscode.CancellationToken;
};

type GetFileReferences = (config: Config) => Promise<ChatRequest['references']>;

export const getFileReferences: GetFileReferences = async (config) =>
  vscode
    .workspace
    .findFiles(config.include, config.exclude || null, config.maxResults, config.token)
    .then(files => files.map(uri => ({
      id: uri.toString(),
      value: uri,
    })));
