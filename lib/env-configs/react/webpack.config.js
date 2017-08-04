const path = require('path');
const commonEntry = require('../webpack-common/entry.js');
const commonOutput = require('../webpack-common/output.js');
const commonResolve = require('../webpack-common/resolve.js');
const commonLoaders = require('../webpack-common/loaders.js');
const commonPlugins = require('../webpack-common/plugins.js');
const commonCssModules = require('../webpack-common/css-modules.js');
const commonSourceMap = require('../webpack-common/sourcemap.js');
const commonDevServer = require('../webpack-common/devserver.js');
const commonDashboard = require('../webpack-common/dashboard.js');

const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  'node_modules/@jakedeichert/create-app'
);

const config = {
  module: {},
  plugins: [],
};

commonEntry(config, workingDir, 'react');
commonOutput(config, workingDir);
commonResolve(config);
commonLoaders(config, thisModuleDir, 'react');
commonPlugins(config);
commonCssModules(config);
commonSourceMap(config);
commonDashboard(config);
commonDevServer(config, workingDir);

module.exports = config;
