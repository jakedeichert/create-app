const path = require('path');
const { getPath, doesFileExist } = require('../../utils/helpers');
const { loadProjectConfig } = require('../../utils/configHelpers');

const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  getPath('@jakedeichert/create-app')
);
const projectConfig = loadProjectConfig(workingDir);
const allConfigs = [];

const webBundleConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {},
  plugins: [],
};

require('../webpack-common/entry')(
  webBundleConfig,
  workingDir,
  projectConfig.type
);
require('../webpack-common/watch')(webBundleConfig);
require('../webpack-common/output')(webBundleConfig, workingDir);
require('../webpack-common/resolve')(webBundleConfig, workingDir);
require('../webpack-common/optimizations')(webBundleConfig);
require('../webpack-common/loaders')(
  webBundleConfig,
  thisModuleDir,
  projectConfig.type
);
require('../webpack-common/plugins')(webBundleConfig, projectConfig, false);
require('../webpack-common/sourcemap')(webBundleConfig);
require('../webpack-common/devserver')(webBundleConfig, workingDir);
allConfigs.push(webBundleConfig);

if (process.env.NODE_ENV === 'production') {
  const mainExt = projectConfig.type === 'typescript-react' ? 'tsx' : 'js';
  const libEntry = path.join(workingDir, `src/index.lib.${mainExt}`);
  // Only build a lib if the entrypoint exists
  if (doesFileExist(libEntry)) {
    const nodeLibConfig = {
      mode: 'production',
      module: {},
      plugins: [],
      target: 'node',
    };

    require('../webpack-common/entry')(
      nodeLibConfig,
      workingDir,
      projectConfig.type,
      true
    );
    require('../webpack-common/output')(nodeLibConfig, workingDir, true);
    require('../webpack-common/resolve')(nodeLibConfig, workingDir);
    require('../webpack-common/loaders')(
      nodeLibConfig,
      thisModuleDir,
      projectConfig.type
    );
    require('../webpack-common/plugins')(nodeLibConfig, projectConfig, true);
    allConfigs.push(nodeLibConfig);
  }
}

module.exports = allConfigs;
