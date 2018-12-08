const path = require('path');

module.exports = (config, projectConfig, workingDir, isLibrary) => {
  const { publicPath, bundleFilename, chunkFilename } = projectConfig;
  config.output = {
    path: path.join(workingDir, 'dist/'),
  };

  if (isLibrary) {
    config.output.libraryTarget = 'commonjs';
    config.output.filename = 'lib.js';
    return;
  }

  config.output.publicPath = publicPath;
  config.output.filename = bundleFilename || 'bundle/[name].bundle.js';
  config.output.chunkFilename = chunkFilename || 'bundle/[name].chunk.js';

  if (process.env.NODE_ENV === 'production') {
    config.output.filename =
      bundleFilename || 'bundle/[name].[contenthash:8].bundle.js';
    config.output.chunkFilename =
      chunkFilename || 'bundle/[name].[contenthash:8].chunk.js';
  }
};
