const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

// https://github.com/webpack-contrib/webpack-serve
module.exports = (config, workingDir) => {
  if (process.env.NODE_ENV === 'production') return;

  // Since I run webpack-serve inside of a docker container sometimes,
  // I need to set the host to 0.0.0.0 to bind to all IPs so that the dev
  // server will respond through the bridged network.
  config.serve = {
    port: '8080',
    host: '0.0.0.0',
    content: path.join(workingDir, 'dist'),

    // https://github.com/webpack-contrib/webpack-serve#hot
    hot: false,

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
