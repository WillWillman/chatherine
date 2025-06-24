import * as vscode from 'vscode';
import { withFileContent, sendRequest, streamResponse } from '..';
import { ChatRequestHandler } from '../../../interfaces';

const exists = v => v !== undefined && v !== null && v !== '';

type ChatStream = (instructions?: (string | object | number | boolean)[]) => ChatRequestHandler;
export const chatStream: ChatStream = (instructions = []) => async (request, context, stream, token) => {

  const references = await Promise.all(request.references.map(withFileContent(stream)));

  console.log('Chat stream request:', {
    model: request.model.id,
    instructions,
    userPrompt: request.prompt,
    tools: request.toolReferences,
    references,
    context,
  });

  const messages = [
    ...instructions,
    'User prompt:',
    request.prompt,
    request.toolReferences,
    references,
    context,
  ].filter(exists);

  await sendRequest(request.model, token)(messages)
    .then(streamResponse(stream))
    .catch(async (error) => {
      stream.progress('Error in chat stream' + error.message);
      if (error.message.includes('Model is not supported for this request.')) {
        const [baseModel] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
        stream.progress('Model is not supported for this request. Using backup model...' + baseModel.id);
        return sendRequest(baseModel, token)(messages)
          .then(streamResponse(stream));
      }
      throw error;
    });
};
