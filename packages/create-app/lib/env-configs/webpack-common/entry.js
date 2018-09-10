const path = require('path');

module.exports = (config, workingDir, projectType) => {
  const mainExt = projectType === 'typescript-react' ? 'tsx' : 'js';
  config.entry = {
    app: [path.join(workingDir, `src/index.${mainExt}`)],
  };
};
