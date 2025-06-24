import { httpClient } from './utils/httpClient';

export const listModels = (config) => () =>
  httpClient
    .get(config.endpoint + '/models', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
    })
    .then(({ data }) => data)
    .then((models) => models.map(({ id }) => id));
