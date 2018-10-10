const path = require('path');
const { getBasePath } = require('../../utils/configHelpers');

module.exports = (config, workingDir, isLibrary) => {
  config.output = {
    path: path.join(workingDir, 'dist/'),
  };

  if (isLibrary) {
    config.output.libraryTarget = 'commonjs';
    config.output.filename = 'lib.js';
    return;
  }

  config.output.publicPath = getBasePath();
  config.output.filename = 'bundle/[name].[hash:8].bundle.js';
  config.output.chunkFilename = 'bundle/[name].[chunkhash:8].bundle.js';
};
