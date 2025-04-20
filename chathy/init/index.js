/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));
const replacePlaceholders = (string, [replaceValue, withValue]) => string.replace(new RegExp(`\\$\\{${replaceValue}\\}`, 'g'), withValue);

const copyAndReplacePlaceholders = (
  srcDir,
  destDir,
  placeholders,
) =>
  fs.readdirSync(srcDir, { withFileTypes: true })
    .forEach((entry) => {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        return copyAndReplacePlaceholders(srcPath, destPath, placeholders);
      }

      const file = fs.readFileSync(srcPath, 'utf-8');
      const content = Object
        .entries(placeholders)
        .reduce(replacePlaceholders, file);

      return fs.writeFileSync(destPath, content, 'utf-8');
    });

module.exports = async () => {
  const currentDir = process.cwd();
  const templateDir = path.resolve(__dirname, 'template');

  const userInputName = await askQuestion('Enter the name of your extension: ');
  const userInputPublisher = await askQuestion('Enter the publisher name: ');
  const userInputDisplayName = await askQuestion('Enter the display name: ');
  const userInputDescription = await askQuestion('Enter a description: ');

  rl.close();

  const placeholders = {
    USERINPUT_NAME: userInputName,
    USERINPUT_PUBLISHER: userInputPublisher,
    USERINPUT_DISPLAY_NAME: userInputDisplayName,
    USERINPUT_DESCRIPTION: userInputDescription,
  };

  copyAndReplacePlaceholders(templateDir, currentDir, placeholders);

  console.log('Initialization complete!');
  process.exit(0);
};
