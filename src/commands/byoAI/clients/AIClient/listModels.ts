import { httpClient } from './utils/httpClient';

export interface ModelInfo {
  id: string;
  object?: string;
  created?: number;
  owned_by?: string;
  max_input_tokens?: number;
  max_output_tokens?: number;
  max_tokens?: number;
  litellm_provider?: string;
  mode?: string;
  supports_function_calling?: boolean;
  [key: string]: any;
}

export const listModels = (config) => (): Promise<ModelInfo[]> =>
  httpClient
    .get(config.endpoint + '/models', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
    })
    .then(({ data }) => data);
