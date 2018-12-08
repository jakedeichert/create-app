const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getEnv } = require('../../utils/helpers');

module.exports = (config, projectConfig, isLibrary) => {
  const plugins = [envVariables(projectConfig.envVars)];

  if (!isLibrary) {
    plugins.push(htmlTemplateFile(), bundleAnalyzer());

    if (process.env.NODE_ENV === 'production') {
      // Guarantee same hashes on rebuilds
      plugins.push(new HashedModuleIdsPlugin());
    }
  }

  config.plugins = plugins.filter(v => !!v);
};

// https://webpack.js.org/plugins/environment-plugin/
const envVariables = configEnvVars =>
  new EnvironmentPlugin({
    // NOTE: if you don't specify variables here, they will be undefined in the built package.
    ...configEnvVars,
  });

// https://github.com/webpack-contrib/webpack-bundle-analyzer
const bundleAnalyzer = () =>
  getEnv('build', 'info') && new BundleAnalyzerPlugin();

// https://github.com/jantimon/html-webpack-plugin
const htmlTemplateFile = () =>
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  });
