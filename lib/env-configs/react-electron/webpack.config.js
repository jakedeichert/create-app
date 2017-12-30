const path = require('path');
const { loadProjectConfig } = require('../../utils/helpers');

const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  'node_modules/@jakedeichert/create-app'
);
const { type } = loadProjectConfig(workingDir);

const config = {
  target: 'electron-renderer',
  module: {},
  plugins: [],
};

require('../webpack-common/entry.js')(config, workingDir, type);
require('../webpack-common/watch.js')(config);
require('../webpack-common/output.js')(config, workingDir);
require('../webpack-common/resolve.js')(config);
require('../webpack-common/loaders.js')(config, thisModuleDir, type);
require('../webpack-common/plugins.js')(config);
require('../webpack-common/sourcemap.js')(config);
require('../webpack-common/devserver.js')(config, workingDir);

module.exports = config;
