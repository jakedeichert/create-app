const path = require('path');
const { getBasePath } = require('../../utils/configHelpers');

module.exports = (config, workingDir) => {
  config.output = {
    path: path.join(workingDir, 'dist/'),
    publicPath: getBasePath(),
    filename: 'bundle/[name].[hash:8].bundle.js',
    chunkFilename: 'bundle/[name].[chunkhash:8].bundle.js',
  };
};
