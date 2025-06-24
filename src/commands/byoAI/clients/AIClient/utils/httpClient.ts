export const httpClient = ({
  post: (endpoint, options) =>
    fetch(endpoint.replace('//', '/'), {
      ...options,
      method: 'POST',
      body: JSON.stringify(options.body),
    })
      .then(response => response.json()),
  get: (endpoint, options) =>
    fetch(endpoint, {
      ...options,
      method: 'GET',
    })
      .then(response => response.json()),
});
