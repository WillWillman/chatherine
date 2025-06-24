import { listModels } from './listModels';
import { sendRequest } from './sendRequest';

export const AIClient = (config) => ({
  listModels: () => listModels(config),
  getModel: (model) => ({
    id: model,
    name: model,
    sendRequest: sendRequest({ ...config, model }),

    countTokens: null,
    family: null,
    maxInputTokens: null,
    maxOutputTokens: null,
    vendor: null,
    version: null,
  }),
});
