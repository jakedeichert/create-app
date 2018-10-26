import { name, version as pkgVersion } from '../../package.json';

export const appName = name;
export const version = pkgVersion;

export const apiEndpoint = 'http://localhost:4000';

export const basePath = process.env.BASE_PATH || '';
