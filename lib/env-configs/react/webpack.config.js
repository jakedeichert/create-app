const path = require('path');
const projectType = 'react';

const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  'node_modules/@jakedeichert/create-app'
);

const config = {
  module: {},
  plugins: [],
};

require('../webpack-common/entry.js')(config, workingDir, projectType);
require('../webpack-common/output.js')(config, workingDir);
require('../webpack-common/resolve.js')(config);
require('../webpack-common/loaders.js')(config, thisModuleDir, projectType);
require('../webpack-common/plugins.js')(config);
require('../webpack-common/css-modules.js')(config);
require('../webpack-common/sourcemap.js')(config);
require('../webpack-common/devserver.js')(config, workingDir);
require('../webpack-common/dashboard.js')(config);

module.exports = config;
