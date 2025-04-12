#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const [COMMAND, ARG] = process.argv.slice(2);
const exec = (cmd) => () => require('child_process').execSync(cmd, { stdio: 'inherit' });

const command = {
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
