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
  const templateDir = path.resolve(__dirname, 'template');

  const userInputName = await askQuestion('Enter the name of your extension: ');
  const userInputPublisher = await askQuestion('Enter the publisher name: ');
  const userInputDisplayName = await askQuestion('Enter the display name: ');
  const userInputDescription = await askQuestion('Enter a description: ');
  const userInputCreateDir = await askQuestion('Create a new directory for the extension? (y/n): ');
  const userInputDir = userInputCreateDir === 'y'
    ? path.resolve(process.cwd(), await askQuestion('Enter the name of the new directory: '))
    : process.cwd();

  rl.close();

  if (fs.existsSync(userInputDir) || fs.readdirSync(userInputDir).length > 0) {
    console.error(`Directory ${userInputDir} already exists and is not empty. Please choose a different directory.`);
    process.exit(1);
  }
  if (userInputCreateDir === 'y' && !fs.existsSync(userInputDir)) {
    fs.mkdirSync(userInputDir, { recursive: true });
  }

  const placeholders = {
    USERINPUT_NAME: userInputName,
    USERINPUT_PUBLISHER: userInputPublisher,
    USERINPUT_DISPLAY_NAME: userInputDisplayName,
    USERINPUT_DESCRIPTION: userInputDescription,
  };

  copyAndReplacePlaceholders(templateDir, userInputDir, placeholders);

  const child_process = require('child_process');
  try {
    child_process.execSync('npm install', {
      cwd: userInputDir,
      stdio: 'inherit',
    });

    child_process.execSync('npm run dev', {
      cwd: userInputDir,
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(`Error executing command`, error.message);
  }

  console.log('Initialization complete!');
  process.exit(0);
};
