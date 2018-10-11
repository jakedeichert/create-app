const { getPath } = require('../../utils/helpers');

// Custom Jest transform implementation that wraps babel-jest and injects our
// babel presets, so we don't have to use .babelrc
// from https://github.com/facebook/jest/issues/1468#issuecomment-276753756
module.exports = require('babel-jest').createTransformer({
  configFile: `./${getPath(
    '@jakedeichert/create-app/lib/env-configs/react/.babelrc.test.js'
  )}`,
});
