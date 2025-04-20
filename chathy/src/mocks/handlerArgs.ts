 
import * as vscode from 'vscode';
import { chatResponseStream } from './chatResponseStream';
import { chatContext } from './chatContext';
import { chatRequest } from './chatRequest';
import { cancellationToken } from './cancellationToken';

export const handlerArgs: Parameters<vscode.ChatRequestHandler> = [
  chatRequest,
  chatContext,
  chatResponseStream,
  cancellationToken,
];
