import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { safeJSON } from './safeJSON';


type TextResponse = { content: [{ type: 'text', text: string }] };
const textResponse = (text: string): TextResponse => ({ content: [{ type: 'text', text }] });
const processCommandOutput = (onResponse) => async (output: string) =>
  Promise
    .resolve(output)
    .then(safeJSON.parse)
    .then(onResponse)
    .then(safeJSON.stringify)
    .then(textResponse);

export const runCMD = (cmd: string, cwd: string, onResponse) =>
  promisify(exec)(cmd, { cwd })
    .then(({ stdout }) => stdout)
    .catch(error => error.stdout?.trim() || error.message || error)
    .then(processCommandOutput(onResponse));
