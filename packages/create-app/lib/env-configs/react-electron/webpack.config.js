const path = require('path');
const { getPath } = require('../../utils/helpers');
const { loadProjectConfig } = require('../../utils/configHelpers');

const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  getPath('@jakedeichert/create-app')
);
const projectConfig = loadProjectConfig(workingDir);

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'electron-renderer',
  module: {},
  plugins: [],
};

require('../webpack-common/entry')(config, workingDir, projectConfig.type);
require('../webpack-common/watch')(config);
require('../webpack-common/output')(config, projectConfig, workingDir);
require('../webpack-common/resolve')(config, workingDir);
require('../webpack-common/optimizations')(config);
require('../webpack-common/loaders')(config, thisModuleDir, projectConfig.type);
require('../webpack-common/plugins')(config, projectConfig, false);
require('../webpack-common/sourcemap')(config);
require('../webpack-common/devserver')(config, workingDir);

module.exports = config;
