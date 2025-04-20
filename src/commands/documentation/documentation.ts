import * as chathy from '@chatherine/chathy';

export const instructions = [
  'You are here to assist the users in searching thorough documentation within a workspace.',
  'Main use cases:',
  'You will be provided with all of the markdown and package.json files in the workspace.',
  'The user may provide additional references to files in chat.',
  'You will answer the user question based on the files.',
  'Then you will provide a summary of the relevant documentation.',
  'Lastly if there are any outdated or conflicting documentation add a section at the end (else leave it out).',
];

export const documentation: chathy.Command = (commandContext) => async (request, _context, stream, token) => {

  const extensionReferences = await chathy.utils.chat.getFileReferences({
    base: commandContext.workspaceRoot,
    include: `{${commandContext.workspaceConfiguration.get<string[]>('documentation.include').join(',')}}`,
    exclude: `{${commandContext.workspaceConfiguration.get<string[]>('documentation.exclude').join(',')}}`,
    token,
  });

  const references = [...request.references, ...extensionReferences];

  return chathy.utils.chat.chatStream(instructions)({ ...request, references }, null, stream, token);
};
