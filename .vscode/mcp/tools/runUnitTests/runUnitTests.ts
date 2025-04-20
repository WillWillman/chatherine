import { z } from 'zod';
import { runCMD } from '../utils';
import { onResponse } from './utils';

export const runUnitTests = {
  description: 'Runs unit tests in the cwd specified (usually workspace root directory) with an optional test pattern filter',
  args: {
    cwd: z.string(),
    pattern: z.string().optional().default(''),
  },
  toolCallback: args => runCMD(`npm --silent run test:json ${args.pattern}`, args.cwd, onResponse),
};
