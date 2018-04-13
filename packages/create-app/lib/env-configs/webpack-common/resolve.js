const path = require('path');

module.exports = (config, workingDir) => {
  config.resolve = {
    // Allows you to require('file') instead of require('file.ext')
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // Searches these directories for modules
    modules: ['node_modules', 'src'],
  };

  // Changes the directories where webpack looks for loaders
  // Doing this allows lerna to work
  config.resolveLoader = {
    modules: [
      path.join(workingDir, 'node_modules'),
      path.join(__dirname, '../../../node_modules'),
    ],
  };
};
