const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractAppCss = new ExtractTextPlugin('bundle/app.bundle.css');

const cssRule = {
  test: /\.css$/,
  exclude: /semantic-ui-css\/semantic\.css$/,
};

module.exports = config => {
  if (process.env.NODE_ENV === 'production') {
    cssRule.use = extractAppCss.extract({
      use: [cssLoaderOptions()],
    });
    config.plugins.push(extractAppCss);
  } else {
    cssRule.use = [devModeStyleLoader(), cssLoaderOptions()];
  }

  config.module.rules.push(cssRule);
};

const cssLoaderOptions = () => ({
  loader: 'css-loader',
  options: {
    modules: true,
    minimize: true,
    localIdentName: '[hash:base64:10]',
  },
});

// Use style tags for faster rebuilds in development.
const devModeStyleLoader = () => ({
  loader: 'style-loader',
});
