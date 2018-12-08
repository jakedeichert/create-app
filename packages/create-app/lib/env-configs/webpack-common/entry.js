const path = require('path');

module.exports = (config, workingDir, projectType, isLibrary) => {
  const mainExt = projectType === 'typescript-react' ? 'tsx' : 'js';

  if (isLibrary) {
    config.entry = path.join(workingDir, `src/index.lib.${mainExt}`);
    return;
  }

  config.entry = {
    main: [path.join(workingDir, `src/index.${mainExt}`)],
  };
};
