module.exports = config => {
  if (process.env.NODE_ENV === 'production') return;

  // Since I run webpack-serve inside of a docker container sometimes,
  // I need to set the host to 0.0.0.0 to bind to all IPs so that the dev
  // server will respond through the bridged network.
  config.serve = {
    port: '8080',
    host: '0.0.0.0',
  };
};
