#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const distInitPath = path.join(__dirname, 'dist', 'init');
const initPath = fs.existsSync(distInitPath)
  ? distInitPath
  : path.join(__dirname, 'init');
const init = require(initPath);

const [COMMAND, ARG] = process.argv.slice(2);

const exec = (cmd, args = []) => (exit) => {
  try {
    child_process.execFileSync(cmd, args, { stdio: 'inherit' });
    if (exit) process.exit(0);
  } catch (error) {
    console.error(`Error executing command: ${cmd} ${args.join(' ')}`);
    console.error(error);
    process.exit(1);
  }
};

const command = (cmd, arg) => {
  return {
    'init': init,
    'compile:vsix': exec('vsce', ['package', '-o', 'extension.vsix']),
    'install:extension': exec('code', ['--install-extension', 'extension.vsix', '--force']),
    'uninstall:extension': exec('code', ['--uninstall-extension', arg, '--force']),
    'reinstall:extension': () => {
      command('uninstall:extension', arg)(false);
      command('install:extension', arg)(true);
    },
    'publish:extension': exec('vsce', ['publish']),
  }[cmd];
};

if (!command) {
  console.error(`Unknown command: ${COMMAND}`);
  process.exit(1);
}


command(COMMAND, ARG)(true);
