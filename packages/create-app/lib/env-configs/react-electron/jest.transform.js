// Custom Jest transform implementation that wraps babel-jest and injects our
// babel presets, so we don't have to use .babelrc
// from https://github.com/facebook/jest/issues/1468#issuecomment-276753756
module.exports = require('babel-jest').createTransformer({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'electron',
        // A little different than the normal babelrc (don't disable "modules")
        // https://babeljs.io/docs/plugins/preset-env/#optionsmodules
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
});
