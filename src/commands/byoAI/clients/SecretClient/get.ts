import * as vscode from 'vscode';

export const get = (commandContext) => async (key) => {
  const contextKey = `chatherine.byoAI.${key}`;

  const found: string = await commandContext
    .extensionContext
    .secrets
    .get(contextKey);

  if (found) {
    return found;
  }

  const value = await vscode.window.showInputBox({
    prompt: `Please enter your ${key} for the BYO AI.`,
    ignoreFocusOut: true,
  });

  await commandContext
    .extensionContext
    .secrets
    .store(contextKey, value);

  return value;
};
