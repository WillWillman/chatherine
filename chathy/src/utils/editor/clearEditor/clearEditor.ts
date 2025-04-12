import * as vscode from 'vscode';

export const clearEditor = (textEditor: vscode.TextEditor) => textEditor.edit(edit => {
	const start = new vscode.Position(0, 0);
	const end = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
	edit.delete(new vscode.Range(start, end));
});
