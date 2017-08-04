const path = require('path');

module.exports = (config, workingDir) => {
  if (process.env.NODE_ENV === 'production') return;

  // Since I run webpack dev server inside of a docker container sometimes,
  // I need to set the host to 0.0.0.0 to bind to all IPs so that the dev
  // server will respond through the bridged network.
  config.devServer = {
    port: '8080',
    host: '0.0.0.0',
    contentBase: path.join(workingDir, 'dist'),
    overlay: {
      warnings: true,
      errors: true,
    },
  };
};
