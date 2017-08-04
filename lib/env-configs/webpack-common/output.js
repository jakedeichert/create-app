const path = require('path');

module.exports = (config, workingDir) => {
  config.output = {
    path: path.join(workingDir, 'dist/'),
    publicPath: '/', // For webpack dev server
    filename: 'bundle/[name].bundle.js',
  };
};
