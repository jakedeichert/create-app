const path = require('path');
const { doesFileExist } = require('./helpers');

const getProjectType = workingDir => {
  const isTypeScript =
    doesFileExist(path.join(workingDir, 'src/index.ts')) ||
    doesFileExist(path.join(workingDir, 'src/index.tsx'));
  const isWebApp = doesFileExist(path.join(workingDir, 'src/index.html'));

  if (isWebApp) return isTypeScript ? 'typescript-react' : 'react';

  return isTypeScript ? 'typescript-lib' : 'js-lib';
};

const getPublicPath = () => {
  if (typeof process.env.PUBLIC_PATH !== 'undefined') {
    return process.env.PUBLIC_PATH;
  }
  return '/';
};

exports.loadProjectConfig = workingDir => {
  let config = {
    type: getProjectType(workingDir),
    publicPath: getPublicPath(), // Defaults to env var PUBLIC_PATH
    bundleFilename: null,
    chunkFilename: null,
    envVars: {},
  };
  const configPath = path.join(workingDir, 'createapp.config.js');
  // Allow config file to override default
  if (doesFileExist(configPath)) {
    config = Object.assign(config, require(configPath));
  }
  return config;
};
