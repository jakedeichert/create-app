import { camelCaseDeep, snakeCaseDeep } from 'utils/obj';

type GET = 'get';
type POST = 'post';
type PATCH = 'patch';
type DELETE = 'delete';

type MethodType = GET | POST | PATCH | DELETE;

type fetchConfigOptions = {
  headers?: { [key: string]: string };
  body?: object;
  rawBody?: boolean;
  credentials?: RequestCredentials;
};

const fetchConfig = (
  methodType: MethodType,
  options: fetchConfigOptions = {}
) => {
  const { headers, body, rawBody, credentials } = options;
  const config: RequestInit = {
    // POST, PATCH, DELETE all use the 'post' method
    method: methodType === 'get' ? 'get' : 'post',
    credentials: credentials || 'same-origin',
  };
  config.headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  });

  if (body) {
    config.body = rawBody
      ? JSON.stringify(body)
      : JSON.stringify(snakeCaseDeep(body));
  }
  if (methodType === 'patch' || methodType === 'delete') {
    config.headers.set('X-HTTP-Method-Override', methodType);
  }
  return config;
};

export type ApiResponse = [
  any,
  {
    code: number;
    msg: string;
  },
  Headers
];
const apiResponse = async (response: Response): Promise<ApiResponse> => {
  const results = await response.json().then(camelCaseDeep);
  const status = {
    code: response.status,
    msg: response.statusText,
  };
  return [results, status, response.headers];
};

const apiError = (response: Response, route: string, body?: object) => {
  const error = new Error(
    `
    API request failed.
    url: ${route}
    ${body ? `Body: ${JSON.stringify(snakeCaseDeep(body))}` : ''}
    `
  ) as any;
  error.response = response;
  return error;
};

export const get = async (route: string, options: fetchConfigOptions = {}) => {
  const conf = fetchConfig('get', options);
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route);
};

export const post = async (
  route: string,
  body: object,
  options: fetchConfigOptions = {}
) => {
  const conf = fetchConfig('post', { body, ...options });
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, body);
};

export const patch = async (
  route: string,
  body: object,
  options: fetchConfigOptions = {}
) => {
  const conf = fetchConfig('patch', { body, ...options });
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, body);
};

export const del = async (
  route: string,
  body?: object | null,
  options: fetchConfigOptions = {}
) => {
  const b = body ? body : undefined;
  const conf = fetchConfig('delete', { body: b, ...options });
  const response = await fetch(route, conf);
  if (response.ok) return apiResponse(response);
  throw apiError(response, route, b);
};
