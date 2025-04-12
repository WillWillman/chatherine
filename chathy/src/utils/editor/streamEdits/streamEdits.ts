import * as vscode from 'vscode';
import { makeEdit } from '../makeEdit';

type StreamEdits = (textEditor: vscode.TextEditor) => (response: vscode.LanguageModelChatResponse) => Promise<void>;

export const streamEdits: StreamEdits = (textEditor) => async (response) => {
	for await (const fragment of response.text) {
		makeEdit(textEditor, fragment);
	}
};
