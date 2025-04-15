import * as chathy from '@chatherine/chathy';
import * as fs from 'fs';
import { join } from 'path';

const shouldRecurse = (entry: fs.Dirent, ignoreDirs: string[]): boolean =>
  entry.isDirectory() && !ignoreDirs.includes(entry.name);

const shouldUseFile = (entry: fs.Dirent): boolean =>
  entry.isFile() && /\.md$|^package\.json$/.test(entry.name);

export const getFileReferences = (dir: string, ignoreDirs: string[]): chathy.ChatRequest['references'] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap(entry => {
      if (shouldRecurse(entry, ignoreDirs)) return getFileReferences(join(dir, entry.name), ignoreDirs);
      if (shouldUseFile(entry)) return [{ id: entry.name, value: `file://${join(dir, entry.name)}` }];
      return [];
    });
