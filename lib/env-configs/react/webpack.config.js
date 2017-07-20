const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const workingDir = process.cwd();
const thisModuleDir = path.join(
  workingDir,
  'node_modules/@jakedeichert/create-app'
);

const config = {
  entry: {
    app: path.join(workingDir, 'src/app.main.js'),
  },
  output: {
    path: path.join(workingDir, 'dist/'),
    publicPath: '/', // For webpack dev server
    filename: 'bundle/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          extends: path.join(thisModuleDir, 'lib/env-configs/react/.babelrc'),
        },
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
  ? applyProductionConfig()
  : applyDevConfig();

function applyProductionConfig() {
  // Generate full source maps
  config.devtool = 'source-map';

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
    new ExtractTextPlugin('bundle/app.bundle.css')
  );
}

function applyDevConfig() {
  // Generate eval source maps (optional - slows down rebuilds)
  config.devtool = 'eval';

  // Fail out on the first error to force exit the bundling process
  config.bail = true;

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
    contentBase: path.join(workingDir, 'dist'),
    overlay: {
      warnings: true,
      errors: true,
    },
  };
}

module.exports = config;
