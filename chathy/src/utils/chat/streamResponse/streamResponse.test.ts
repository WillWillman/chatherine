import { streamResponse } from './streamResponse';
import * as mocks from '../../../mocks';

describe('streamResponse', () => {
  const [_, __, stream] = mocks.handlerArgs;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(stream, 'markdown');
  });

  it('should stream text fragments to markdown', async () => {
    const textFragments = [
      'fragment1',
      'fragment2',
      'fragment3',
    ];

    const result = await streamResponse(stream)(mocks.languageModelChatResponse(textFragments));

    expect(stream.markdown).toHaveBeenCalledTimes(3);
    expect(stream.markdown).toHaveBeenCalledWith('fragment1');
    expect(stream.markdown).toHaveBeenCalledWith('fragment2');
    expect(stream.markdown).toHaveBeenCalledWith('fragment3');
    expect(result).toBe('fragment1fragment2fragment3');
  });
});
