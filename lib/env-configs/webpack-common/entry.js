const path = require('path');

module.exports = (config, workingDir, projectType) => {
  config.entry = {
    app: [path.join(workingDir, 'src/app.main.js')],
  };

  // Add the polyfills for browser compatibility
  if (process.env.NODE_ENV === 'production' && projectType === 'react') {
    config.entry.app.unshift(require.resolve('../react/polyfills'));
  }
};
