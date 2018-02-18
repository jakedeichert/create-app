const webpack = require('webpack');

module.exports = config => {
  config.plugins = [envVariables(), vendor(), webpackBootstrap()];
};

const envVariables = () =>
  new webpack.DefinePlugin({
    'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL || ''),
  });

// Configure the vendor bundle
const vendor = () =>
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    // Moves all vendor modules into the vendor chunk.
    minChunks: function(module) {
      return module.context && module.context.indexOf('node_modules') !== -1;
    },
  });

// Webpack bootstrap logic
// https://webpack.js.org/plugins/commons-chunk-plugin/#manifest-file
const webpackBootstrap = () =>
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  });
