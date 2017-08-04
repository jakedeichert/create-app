const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssRule = {
  test: /\.css$/,
};

module.exports = config => {
  if (process.env.NODE_ENV === 'production') {
    cssRule.use = ExtractTextPlugin.extract({
      use: [cssLoaderOptions()],
    });
    config.plugins.push(new ExtractTextPlugin('bundle/app.bundle.css'));
  } else {
    cssRule.use = [devModeStyleLoader(), cssLoaderOptions()];
  }

  config.module.rules.push(cssRule);
};

const cssLoaderOptions = () => ({
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[hash:base64:10]',
  },
});

// Use style tags for faster rebuilds in development.
const devModeStyleLoader = () => ({
  loader: 'style-loader',
});
