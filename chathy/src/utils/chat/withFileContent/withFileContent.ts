import * as vscode from 'vscode';

export const withFileContent = (stream: vscode.ChatResponseStream) =>  async (reference: vscode.ChatPromptReference) => {
  try {
    const uri = getUri(reference);
    const document = await vscode.workspace.openTextDocument(uri);
    const range = getRange(reference, document);

    const fileContent = document.getText(range);

    stream.reference(uri);

    return {
      ...reference,
      fileContent,
    }
  } catch (error) {
    console.error('Chatherine: Error getting file content:', error);
    return reference;
  }
};

const getRange = (reference: vscode.ChatPromptReference, document: vscode.TextDocument): vscode.Range => {
  const asLocation = reference.value as vscode.Location;
  if (asLocation.range)
    return asLocation.range;

  const [start, end] = reference.range || [];
  if (!end) return new vscode.Range(
    new vscode.Position(0, 0),
    new vscode.Position(document.lineCount, 0),
  );

  return new vscode.Range(
    new vscode.Position(start, 0),
    new vscode.Position(end, 0),
  );
};

const getUri = (reference: vscode.ChatPromptReference): vscode.Uri => {
  const asLocation = reference.value as vscode.Location;
  if (asLocation.uri)
    return asLocation.uri;

  if (typeof reference.value === 'string')
    return vscode.Uri.parse(reference.value);

  const asUri = reference.value as vscode.Uri;
  if (asUri.scheme)
    return asUri;

  return
};
