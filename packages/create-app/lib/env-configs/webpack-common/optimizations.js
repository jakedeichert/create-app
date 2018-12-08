const TerserPlugin = require('terser-webpack-plugin');

// https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
// https://webpack.js.org/plugins/split-chunks-plugin/
// https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
// https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
module.exports = config => {
  config.optimization = {
    // Don't need this since I only have 1 entry point bundle (main.js).
    // The default behaviour is actually really good as described on the plugin page for this.
    // The entrypoint (main.js) is combined with all neccessary vendor dependencies. However,
    // if one or more dynamic (page) bundles use a heavy dependency, then it will be broken out
    // into a separate shared vendor bundle.
    // splitChunks: {
    //   chunks: 'all', // https://webpack.js.org/guides/code-splitting/#prevent-duplication
    // },
    // https://webpack.js.org/configuration/optimization/#optimization-runtimechunk
    // Creates bundle/runtime~main.bundle.js (1.09 KiB)
    // runtimeChunk: true,
    // Creates bundle/runtime.bundle.js (1.08 KiB)
    // Don't need this since I only have 1 entry point bundle (main.js).
    // runtimeChunk: 'single',
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
