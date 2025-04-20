 
import * as vscode from 'vscode';

export const languageModelChatResponse = (textFrags: string[]): vscode.LanguageModelChatResponse => {
  const clonedFrags = [...textFrags];
  return {
    stream: (async function* () {
      for (let i = 0; i < clonedFrags.length; i++) {
        yield clonedFrags[i];
      }
    })(),
    text: (async function* () {
      for (let i = 0; i < clonedFrags.length; i++) {
        yield clonedFrags[i];
      }
    })(),
  };
};
