const path = require('path');
const { loadProjectConfig, getPath } = require('../../utils/helpers');

const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  getPath('@jakedeichert/create-app')
);
const { type } = loadProjectConfig(workingDir);

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'electron-renderer',
  module: {},
  plugins: [],
};

require('../webpack-common/entry')(config, workingDir, type);
require('../webpack-common/watch')(config);
require('../webpack-common/output')(config, workingDir);
require('../webpack-common/resolve')(config, workingDir);
require('../webpack-common/optimizations')(config);
require('../webpack-common/loaders')(config, thisModuleDir, type);
require('../webpack-common/plugins')(config);
require('../webpack-common/sourcemap')(config);
require('../webpack-common/devserver')(config, workingDir);

module.exports = config;
