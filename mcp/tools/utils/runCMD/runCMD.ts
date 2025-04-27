import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { z } from 'zod';
import { safeJSON } from './safeJSON';

const Response = z.object({
  content: z.array(z.object({
    type: z.literal('text'),
    text: z.string(),
  })),
});

export const runCMD = (cmd: string, cwd: string, onResponse) =>
  promisify(exec)(cmd, { cwd })

    .then(({ stdout }) => stdout)
    .catch(error => error.stdout?.trim() || error.message || error)
    .then(safeJSON.parse)

    .then(onResponse)

    .then(safeJSON.stringify)

    .then(text => Response.parse({ content: [{ type: 'text', text }] }));
