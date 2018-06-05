import { camelCaseDeep, snakeCaseDeep } from 'utils/obj';
const GET = 'GET';
const POST = 'POST';
const PATCH = 'PATCH';
const PUT = 'PUT';
const DELETE = 'DELETE';

const fetchConfig = (method, options = {}) => {
  const { headers, body, rawBody, credentials } = options;
  const config = {
    method,
    credentials: credentials || 'same-origin', // should use 'include' for cross-origin
    // mode: '...' // https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
  };
  const defaultHeaders = {
    Accept: 'application/json',
  };

  if (body) {
    defaultHeaders['Content-Type'] = 'application/json';
    config.body = rawBody
      ? JSON.stringify(body)
      : JSON.stringify(snakeCaseDeep(body));
  }

  config.headers = new Headers({ ...defaultHeaders, ...headers });
  return config;
};

const apiResponse = async response => {
  try {
    const results = await response.json().then(camelCaseDeep);
    return { results, response };
  } catch (e) {
    const results = null;
    return { results, response };
  }
};

const apiError = (response, route, body = null) => {
  const err = new Error(
    `
    API request failed

    url:\t${route}
    status:\t${response.status}
    msg:\t${response.statusText}
    ${body ? `body: ${JSON.stringify(snakeCaseDeep(body))}` : ''}
    `
  );
  err.response = response;
  return err;
};

export const get = async (route, options = {}) => {
  const conf = fetchConfig(GET, options);
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route);
};

export const post = async (route, body, options = {}) => {
  const conf = fetchConfig(POST, { body, ...options });
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, body);
};

export const patch = async (route, body, options = {}) => {
  const conf = fetchConfig(PATCH, { body, ...options });
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, body);
};

export const put = async (route, body, options = {}) => {
  const conf = fetchConfig(PUT, { body, ...options });
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, body);
};

export const del = async (route, body, options = {}) => {
  const conf = fetchConfig(DELETE, { body, ...options });
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, body);
};
