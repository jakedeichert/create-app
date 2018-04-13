// Custom Jest transform implementation that wraps babel-jest and injects our
// babel presets, so we don't have to use .babelrc
// from https://github.com/facebook/jest/issues/1468#issuecomment-276753756
module.exports = require('babel-jest').createTransformer({
  presets: [
    require('babel-preset-env').default({
      node: 'current',
      // A little different than the normal babelrc (don't disable "modules")
      // https://babeljs.io/docs/plugins/preset-env/#optionsmodules
    }),
    require('babel-preset-react'),
  ],
  plugins: [
    require('babel-plugin-transform-class-properties'),
    require('babel-plugin-transform-object-rest-spread'),
  ],
});
