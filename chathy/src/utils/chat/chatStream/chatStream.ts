import { withFileContent, sendRequest, streamResponse } from '..';
import { ChatRequestHandler } from '../../../interfaces';

type ChatStream = (instructions?: string[]) => ChatRequestHandler;
export const chatStream: ChatStream = (instructions = []) => async (request, context, stream, token) => {

  const references = await Promise.all(request.references.map(withFileContent));

  await sendRequest(request.model, token)([
    ...instructions,
    request.prompt,
    request.toolReferences,
    references,
    context,
  ]).then(streamResponse(stream));

};
