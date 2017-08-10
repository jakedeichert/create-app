const path = require('path');

module.exports = (config, workingDir, projectType) => {
  const mainExt = projectType === 'typescript-react' ? 'tsx' : 'js';
  config.entry = {
    app: [path.join(workingDir, `src/app.main.${mainExt}`)],
  };

  // Add the polyfills for browser compatibility
  if (process.env.NODE_ENV === 'production' && projectType === 'react') {
    config.entry.app.unshift(require.resolve('../react/polyfills'));
  }
};
