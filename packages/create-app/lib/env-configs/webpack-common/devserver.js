const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const { getEnv } = require('../../utils/helpers');

// https://github.com/webpack-contrib/webpack-serve
module.exports = (config, workingDir) => {
  if (!getEnv('dev', 'server_mode')) return;

  // Since I run webpack-serve inside of a docker container sometimes,
  // I need to set the host to 0.0.0.0 to bind to all IPs so that the dev
  // server will respond through the bridged network.
  config.serve = {
    port: '8080',
    host: '0.0.0.0',
    content: path.join(workingDir, 'dist'),

    // https://github.com/webpack-contrib/webpack-serve#optionshotclient
    hotClient: {
      // host: '0.0.0.0',
      // hmr: true,
      // reload: false,
      // autoConfigure: true,
      // logLevel: 'trace',
      // allEntries: true,
    },

    // Required so that reloading a react-router page will work correctly
    // instead of not being able to find that route.
    // https://github.com/webpack-contrib/webpack-serve#add-on-features
    // (app, middleware, options)
    add: app => {
      const historyOptions = {
        // https://github.com/bripkens/connect-history-api-fallback#options
      };
      app.use(convert(history(historyOptions)));
    },
  };
};
