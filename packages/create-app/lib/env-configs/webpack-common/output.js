const path = require('path');

module.exports = (config, workingDir) => {
  config.output = {
    path: path.join(workingDir, 'dist/'),
    publicPath: '/',
    filename: 'bundle/[name].[hash:8].bundle.js',
    chunkFilename: 'bundle/[name].[chunkhash:8].bundle.js',
  };
};
