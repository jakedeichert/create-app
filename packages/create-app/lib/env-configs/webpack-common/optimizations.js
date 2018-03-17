// https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
module.exports = config => {
  config.optimization = {
    // Includes node_modules and the babel polyfills (see webpack-common/entry.js)
    // inside vendor.bundle.js
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  };
};
