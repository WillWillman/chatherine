import { LanguageModelChat } from 'vscode';
import { sendRequest, ApiConfig } from './utils/sendRequest';
import { ModelInfo } from './listModels';

export const getModel = (config: ApiConfig) => (modelInfo?: ModelInfo): LanguageModelChat => {
  if (!modelInfo) {
    throw new Error('Model information is required to get model details');
  }
  return {
    id: modelInfo.id,
    name: modelInfo.name || modelInfo.id,
    sendRequest: sendRequest({ ...config, model: modelInfo.id }),
    family: modelInfo.litellm_provider || 'unknown',
    version: modelInfo.version || 'unknown',
    vendor: modelInfo.owned_by || modelInfo.litellm_provider || 'custom',
    maxInputTokens: modelInfo.max_input_tokens || modelInfo.max_tokens || 8192,
    // Rough estimate: ~4 characters per token
    countTokens: async (text) => {
      const textContent = typeof text === 'string' ? text : text.content;
      return Math.ceil(textContent.length / 4);
    },
  };
};
