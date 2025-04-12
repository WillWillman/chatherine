import { LanguageModelChatResponse } from '../../../interfaces';
import * as mocks from '../../../mocks';
import { chatStream } from './chatStream';
import * as utils from '..';

describe('chatStream', () => {
  const mockResponse = {} as LanguageModelChatResponse;
  const mockSendRequest = jest.fn().mockReturnValue(jest.fn().mockResolvedValue(mockResponse));
  const mockStreamResponse = jest.fn().mockReturnValue(jest.fn());
  const mockWithFileContent = jest.fn(ref => ({ ...ref, fileContent: 'test content' }));

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(utils, 'sendRequest').mockImplementation(mockSendRequest);
    jest.spyOn(utils, 'streamResponse').mockImplementation(mockStreamResponse);
    jest.spyOn(utils, 'withFileContent').mockImplementation(mockWithFileContent);
  });


  it('should chatStream with instructions', async () => {
    const [request, context, stream, token] = mocks.handlerArgs;
    const instructions = ['test instruction'];
    await chatStream(instructions)(request, context, stream, token);

    request.references.forEach((ref, index) => {
      expect(utils.withFileContent).toHaveReturnedWith({ ...ref, fileContent: 'test content' });
      expect(utils.withFileContent).toHaveBeenCalledTimes(index + 1);
    });
    expect(utils.withFileContent).toHaveBeenCalled();
    expect(utils.withFileContent).toHaveBeenCalledTimes(request.references.length);
    expect(utils.sendRequest).toHaveBeenCalledWith(request.model, token);
    expect(utils.sendRequest(request.model, token)).toHaveBeenCalledWith([
      ...instructions,
      request.prompt,
      request.toolReferences,
      await Promise.all(request.references.map(mockWithFileContent)),
      context,
    ]);
    expect(utils.streamResponse).toHaveBeenCalledWith(stream);
    expect(utils.streamResponse(stream)).toHaveBeenCalledWith(mockResponse);
  });

  it('should chatStream without instructions', async () => {
    const [request, context, stream, token] = mocks.handlerArgs;
    await chatStream()(request, context, stream, token);

    expect(utils.sendRequest(request.model, token)).toHaveBeenCalledWith([
      request.prompt,
      request.toolReferences,
      await Promise.all(request.references.map(mockWithFileContent)),
      context,
    ]);
  });

});