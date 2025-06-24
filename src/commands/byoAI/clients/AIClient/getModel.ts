import { sendRequest, ApiConfig } from './utils/sendRequest';

export const getModel = (config: ApiConfig) => (model: string) => ({
  id: model,
  name: model,
  sendRequest: sendRequest({ ...config, model }),

  // TODO: Implement these properties based on the API response
  countTokens: null,
  family: null,
  maxInputTokens: null,
  maxOutputTokens: null,
  vendor: null,
  version: null,
});
