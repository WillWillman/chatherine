import { ChatResponseStream, LanguageModelChatResponse } from '../../../interfaces';

type StreamResponse = (stream: ChatResponseStream) => (response: LanguageModelChatResponse) => Promise<string>;

export const streamResponse: StreamResponse = (stream) => async (response) => {
	const textFragments = [];
	for await (const textFragment of response.text) {
		textFragments.push(textFragment);
		stream.markdown(textFragment);
	}
	return textFragments.join('');
};
