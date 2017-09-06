import * as config from './config';

export function thunkCallback(options = {}) {
  const { url, method, successCallback, data } = options;
  return fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then ((response) => successCallback(response))
  .catch(error => console.log(error));
}
