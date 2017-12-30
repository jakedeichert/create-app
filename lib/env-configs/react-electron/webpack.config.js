const path = require('path');
const { loadProjectConfig } = require('../../utils/helpers');

const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  'node_modules/@jakedeichert/create-app'
);
const { type, semantic } = loadProjectConfig(workingDir);

const config = {
  target: 'electron-renderer',
  module: {},
  plugins: [],
};

require('../webpack-common/entry.js')(config, workingDir, type);
require('../webpack-common/output.js')(config, workingDir);
require('../webpack-common/resolve.js')(config);
require('../webpack-common/loaders.js')(config, thisModuleDir, type);
require('../webpack-common/plugins.js')(config);
require('../webpack-common/css-modules.js')(config);
require('../webpack-common/sourcemap.js')(config);
require('../webpack-common/devserver.js')(config, workingDir);
if (semantic) require('../webpack-common/semantic.js')(config);

module.exports = config;
