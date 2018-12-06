const TerserPlugin = require('terser-webpack-plugin');

// https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
module.exports = config => {
  config.optimization = {
    // Includes node_modules (see webpack-common/entry.js) inside vendor.bundle.js
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
    // https://webpack.js.org/plugins/split-chunks-plugin/#optimization-runtimechunk
    // Creates bundle/runtime~app.bundle.js (1.09 KiB)
    // runtimeChunk: true,
    // Creates bundle/runtime.bundle.js (1.08 KiB)
    runtimeChunk: 'single',
  };

  if (process.env.NODE_ENV === 'production') {
    config.optimization.minimizer = [
      // https://github.com/terser-js/terser#minify-options
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ];
  }
};
