import * as vscode from 'vscode';

export const makeEdit = (textEditor: vscode.TextEditor, value: string) => textEditor.edit(edit => {
	const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
	const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
	edit.insert(position, value);
});
