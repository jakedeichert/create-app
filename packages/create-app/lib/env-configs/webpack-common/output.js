const path = require('path');

module.exports = (config, workingDir) => {
  config.output = {
    path: path.join(workingDir, 'dist/'),
    publicPath: '/',
    filename: 'bundle/[name].bundle.js',
    // chunkFilename: 'bundle/[name].bundle.js',
  };
};
