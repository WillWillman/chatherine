import * as chathy from '@chatherine/chathy';

export const instructions = [
  'You are here to assist the users in searching thorough docs within a workspace.',
  'Main use cases:',
  'You will be provided with all of the markdown and package.json files in the workspace.',
  'The user may provide additional references to files in chat.',
  'You will answer the user question based on the files.',
  'Then you will provide a summary of the relevant docs.',
  'Lastly if there are any outdated or conflicting docs add a section at the end (else leave it out).',
];

export const docs: chathy.Command = (commandContext) => async (request, context, stream, token) => {

  const extensionReferences = await chathy.utils.chat.getFileReferences({
    base: commandContext.workspaceRoot,
    include: `{${commandContext.workspaceConfiguration.get<string[]>('docs.include').join(',')}}`,
    exclude: `{${commandContext.workspaceConfiguration.get<string[]>('docs.exclude').join(',')}}`,
    token,
  });

  const references = [...request.references, ...extensionReferences];

  return chathy.utils.chat.chatStream(instructions)({ ...request, references }, context, stream, token);
};
