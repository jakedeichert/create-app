const path = require('path');
const helpers = require('./helpers');

const getProjectType = workingDir => {
  let projectType = 'react';
  if (
    helpers.doesFileExist(path.join(workingDir, 'src/index.ts')) ||
    helpers.doesFileExist(path.join(workingDir, 'src/index.tsx'))
  ) {
    projectType = 'typescript-react';
  }
  return projectType;
};

exports.loadProjectConfig = workingDir => {
  let config = {
    type: getProjectType(workingDir),
  };
  const configPath = path.join(workingDir, 'createapp.config.js');
  // Allow config file to override default
  if (helpers.doesFileExist(configPath)) {
    config = Object.assign(config, require(configPath));
  }
  return config;
};
