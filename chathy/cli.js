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

const exec = (cmd) => () => {
  try {
    child_process.execSync(cmd, { stdio: 'inherit' });
    process.exit(0);
  } catch (error) {
    console.error(`Error executing command: ${cmd}`);
    console.error(error);
    process.exit(1);
  }
};

const command = {
  'init': init,
  'compile:vsix': exec('vsce package -o extension.vsix'),
  'install:extension': exec('code --install-extension extension.vsix --force'),
  'uninstall:extension': exec(`code --uninstall-extension ${ARG} --force`),
  'reinstall:extension': exec('npm run uninstall:extension && npm run install:extension'),
  'publish:extension': exec('vsce publish'),
}[COMMAND];

if (!command) {
  console.error(`Unknown command: ${COMMAND}`);
  process.exit(1);
}


command();
