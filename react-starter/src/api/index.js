import ky from 'ky';
import { camelCaseDeep, snakeCaseDeep } from 'utils/obj';
import { apiEndpoint } from 'constants/app';

const defaultOptions = {
  // https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
  credentials: 'include', // default: same-origin
};

export let api = ky.extend(defaultOptions);

export const setCsrfToken = csrfToken => {
  api = ky.extend({
    ...defaultOptions,
    headers: {
      'x-csrf-token': csrfToken,
    },
  });
};

export const json = async (apiMethod, path, jsonBody = null) => {
  let body = {};
  if (jsonBody) {
    body = {
      json: snakeCaseDeep(jsonBody),
    };
  }
  const results = await apiMethod(route(path), body).json();
  return camelCaseDeep(results);
};

export const route = path => `${apiEndpoint}${path}`;
