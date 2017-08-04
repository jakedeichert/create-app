const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractVendorCss = new ExtractTextPlugin('bundle/vendor.bundle.css');

module.exports = config => {
  config.module.rules.push(semanticAssetLoader);

  if (process.env.NODE_ENV === 'production') {
    config.module.rules.push(semanticProductionCssLoader);
    config.plugins.push(extractVendorCss);
  } else {
    config.module.rules.push(semanticDevCssLoader);
  }
};

const semanticAssetLoader = {
  test: /\.(svg|ttf|png|woff2?|eot)$/,
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    context: './node_modules/',
    publicPath: '../',
  },
};

const semanticProductionCssLoader = {
  test: /semantic-ui-css\/semantic\.css$/,
  use: extractVendorCss.extract({
    use: [
      {
        loader: 'css-loader',
        options: { minimize: true },
      },
    ],
  }),
};

// Use style tags for faster rebuilds in development
const semanticDevCssLoader = {
  test: /semantic-ui-css\/semantic\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
};
