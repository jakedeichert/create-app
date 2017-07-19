const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    app: path.join(__dirname, 'src/app.main.js'),
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/', // For webpack dev server
    filename: 'bundle/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        // Now we can import html files. Example: import 'static/html/about/index.html'
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].html',
          context: './src/static/html/',
        },
      },
    ],
  },
  plugins: [
    // Configure the vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // Moves all vendor modules into the vendor chunk.
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    // Webpack bootstrap logic
    // https://webpack.js.org/plugins/commons-chunk-plugin/#manifest-file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
  resolve: {
    // Allows you to require('file') instead of require('file.js')
    extensions: ['.js', '.jsx'],
    // Searches these directories for modules
    modules: ['node_modules', 'src'],
  },
};

/******************************************************
* PRODUCTION VS DEVELOPMENT
******************************************************/
process.env.NODE_ENV === 'production'
  ? applyProductionConfig({ generateSourceMap: false })
  : applyDevConfig();

function applyProductionConfig({ generateSourceMap }) {
  // Generate full source maps (do not by default)
  if (generateSourceMap) config.devtool = 'source-map';

  // Bundle CSS for production
  config.module.rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[hash:base64:10]',
          },
        },
      ],
    }),
  });

  // Optimize output with plugins
  config.plugins.push(
    // Configure the css bundle
    new ExtractTextPlugin('bundle/app.bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: generateSourceMap, // If generating source maps, must be true
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
  );
}

function applyDevConfig() {
  // Generate eval source maps (optional - slows down rebuilds)
  config.devtool = 'eval';

  // Use style tags for faster rebuilds in development.
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[hash:base64:10]',
        },
      },
    ],
  });

  config.plugins.push(new DashboardPlugin());

  // Config webpack-dev-server
  config.devServer = {
    port: '8080',
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    overlay: {
      warnings: true,
      errors: true,
    },
  };
}

module.exports = config;
