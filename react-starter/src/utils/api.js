import { camelCaseDeep, snakeCaseDeep } from 'utils/obj';
const GET = 'GET';
const POST = 'POST';
const PATCH = 'PATCH';
const PUT = 'PUT';
const DELETE = 'DELETE';

const apiConfig = {
  // https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
  credentials: 'same-origin',
  // mode: '...' // https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
  csrfToken: null,
};

export const config = {
  allowCrossOriginCookies() {
    apiConfig.credentials = 'include';
  },
  setCsrfToken(token) {
    apiConfig.csrfToken = token;
  },
};

const fetchConfig = (method, options = {}) => {
  const { headers, body, rawBody, credentials } = options;
  const config = {
    method,
    credentials: credentials || apiConfig.credentials,
  };
  const defaultHeaders = {
    Accept: 'application/json',
  };

  if (apiConfig.csrfToken) defaultHeaders['x-csrf-token'] = apiConfig.csrfToken;

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
  const contentType = response.headers.get('content-type');
  let results;
  if (contentType.includes('application/json')) {
    results = await response.json().then(camelCaseDeep);
  } else {
    results = await response.text();
  }
  return { results, response };
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

const apiRequest = async (route, conf) => {
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, conf.body);
};

export const get = async (route, options = {}) => {
  const conf = fetchConfig(GET, options);
  return apiRequest(route, conf);
};

export const post = async (route, body, options = {}) => {
  const conf = fetchConfig(POST, { body, ...options });
  return apiRequest(route, conf);
};

export const patch = async (route, body, options = {}) => {
  const conf = fetchConfig(PATCH, { body, ...options });
  return apiRequest(route, conf);
};

export const put = async (route, body, options = {}) => {
  const conf = fetchConfig(PUT, { body, ...options });
  return apiRequest(route, conf);
};

export const del = async (route, body, options = {}) => {
  const conf = fetchConfig(DELETE, { body, ...options });
  return apiRequest(route, conf);
};
